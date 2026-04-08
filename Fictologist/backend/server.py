from fastapi import FastAPI
from pydantic import BaseModel

from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import OllamaLLM

app = FastAPI()

embeddings = OllamaEmbeddings(model="mistral")
db = Chroma(persist_directory="./db", embedding_function=embeddings)
llm = OllamaLLM(model="mistral")

historianPrompt = """
You are a historian.

Rules:
- Only use the provided context
- Do NOT extrapolate or infer
- If unknown, say:
  "This information is not recorded in the archives."
- Always include source IDs
"""

class Query(BaseModel):
    question:str

@app.post("/ask")
def ask(q: Query):
    results = db.similarity_search(q.question, k=3)

    context = "\n".join([r.page_content for r in results])
    sources = [r.metadata["id"] for r in results]

    if not context.strip():
        return {"answer": "This information is not recorded in the archives."}
    
    prompt = f"""
    {historianPrompt}

    Context:
    {context}

    Answer:
    """

    response = llm(prompt)

    return {
        "answer": response,
        "sources": sources
    }
