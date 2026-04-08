import json
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document

#TODO: Loop through section of lore necessary for conversation
#TODO: Hard coded entry for now. Update later for multiple entries.
with open("lore/entries.json") as file:
    data = json.load(file)

docs = []
c_ids = []
for entry in data:
    docs.append(
        Document(page_content=entry["content"], metadata=entry)
    )
    c_ids.append(entry["id"])

embeddings = OllamaEmbeddings(model="mistral")

db = Chroma(collection_name="lore", embedding_function=embeddings, persist_directory="./db")
db.add_documents(documents=docs, ids=c_ids)

print("Vector Database built")