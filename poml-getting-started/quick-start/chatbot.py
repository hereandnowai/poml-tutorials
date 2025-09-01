from openai import OpenAI
from dotenv import load_dotenv
import os
import poml

poml.set_trace(trace_dir="pomlruns")

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = OpenAI(base_url="https://generativelanguage.googleapis.com/v1beta/openai", api_key=api_key)

poml_file = "/home/hn/Documents/1-hereandowai/dev/training/poml-tutorials/poml-getting-started/quick-start/example.poml"

def chat_with_gemini(prompt):
    params = poml.poml(poml_file, context={"question": prompt}, format="openai_chat")
    response = client.chat.completions.create(model="gemini-2.5-flash-lite", **params)
    return response

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    response = chat_with_gemini(user_input)
    print("Gemini:", response.choices[0].message.content)