import os
import json

from fastapi import FastAPI
from pydantic import BaseModel

from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain_core.documents import Document

app = FastAPI()

embeddings = OllamaEmbeddings(model="mistral")
llm = ChatOllama(model="mistral")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

historianPrompt = """
You are a knowledgeable and wise historian.

Rules:
- Act as if you were a human
- Be conversational 
- Be polite
- Be kind
- Only use the provided context for information and only when asked for information
- Do NOT extrapolate or infer
- If unknown, say:
  "This information is not recorded in the archives."
- Reply in complete sentences
"""

class Query(BaseModel):
    question:str
    project:str

class Entry():
    project:str
    content:str
    entry_id:str

def loadDB(project):
    path = os.path.join(BASE_DIR, "projects", project)

    return Chroma(collection_name="lore", persist_directory=os.path.join(path, "db"), embedding_function=embeddings)

@app.post("/ask")
def ask(q: Query):
    db = loadDB(q.project)

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

@app.post("/add_entry")
def addEntry(e: Entry):
    project_path = os.path.join(BASE_DIR, "projects", e.project)
    lore_path = os.path.join(project_path, "lore")
    db_path = os.path.join(project_path, "db")

    os.makedirs(project_path, exist_ok=True)
    os.makedirs(lore_path, exist_ok=True)
    os.makedirs(db_path, exist_ok=True)

    entry_path = os.path.join(lore_path, f"{e.entry_id}.json")

    entry_data = {
        "id": e.entry_id,
        "type": e.entry_id, #Might have tags later
        "content": e.content,
        "source": "user",
        "certainty": "confirmed"
    }

    with open(entry_path, "w") as f:
        json.dump(entry_data, f, indent=2)

    db = Chroma(collection_name="lore", persist_directory=db_path, embedding_function=embeddings)

    db.add_documents([Document(page_content=e.content, metadata=entry_data)])

    return {"status" : "saved"}

@app.post("/entry/{project}/{entry_id}")
def getEntry(project: str, entry_id: str):
    path = os.path.join(BASE_DIR, "projects", project, "lore", f"{entry_id}.json")

    if os.path.exists(path):
        with open(path) as f:
            return json.load(f) 
    else:
        return {"error": "entry not found"}