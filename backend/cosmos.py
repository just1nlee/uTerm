import os
from google import genai
from fastapi import FastAPI, Request
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")
client = genai.Client(api_key=GEMINI_API_KEY)

def generateDirs(arg: str, temperature: int):
    arg = arg.strip()
    input = f"I have created a universe-themed terminal, where we start with the universe and we use AI to generate name of directories to traverse through. You need to generate the name of directories, .txt files, and .config files for the directory {arg}. Your output NEEDS to be in the format: word,word,word,word and nothing else. Only the name of the file separated by a comma, and nothing else. Don't start the response with anything, don't end the response with anything"

    # Send prompt to Gemini
    try:
        response = client.models.generate_content(model=GEMINI_MODEL, contents=input, config={"temperature": temperature, "top_k": 10})
        return [name.strip() for name in response.text.strip().split(',')]
    except Exception as e:
        return None

def generateText(arg: str, temperature: int):
    arg = arg.strip()
    input = f"I have created a universe-themed terminal, where we start with the universe and we use AI to generate name of directories to traverse through. You need to generate the contents of the file {arg}. Your output NEEDS to be only the contents of the file and nothing else. Don't start the response with anything, don't end the response with anything"
    
    # Send prompt to Gemini
    try:
        response = client.models.generate_content(model=GEMINI_MODEL, contents=input, config={"temperature": temperature, "top_k": 10})
        return response.text.strip()
    except Exception as e:
        return None
    
def generateInfo(arg: str, temperature: int):
    arg = arg.strip()
    input = f"I have created a universe-themed terminal, where we start with the universe and we use AI to generate name of directories to traverse through. Generate output for the function info(), which generates information about the specific directory that you're in. Generate information about {arg}. Your output NEEDS to be only the contents of the file and nothing else. Don't start the response with anything, don't end the response with anything"
    
    # Send prompt to Gemini
    try:
        response = client.models.generate_content(model=GEMINI_MODEL, contents=input, config={"temperature": temperature, "top_k": 10})
        return response.text.strip()
    except Exception as e:
        return None