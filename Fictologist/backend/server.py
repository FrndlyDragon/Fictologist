from fastapi import FastAPI
from pydantic import BaseModel

from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import ChatOllama

app = FastAPI()

embeddings = OllamaEmbeddings(model="mistral")
db = Chroma(collection_name="lore", persist_directory="./db", embedding_function=embeddings)
llm = ChatOllama(model="mistral")

historianPrompt = """
You are a knowledgeable and wise historian.

Rules:
- Act as if you were a human
- Be conversational 
- Be polite
- Be kind
- Only use the provided context for information
- Do NOT extrapolate or infer
- If unknown, say:
  "This information is not recorded in the archives."
- Reply in complete sentences
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

    Question:
    {q.question}

    Answer:
    """

    response = llm.invoke(prompt)
    print(response)
    return {
        "answer": response.content,
        "sources": sources
    }
