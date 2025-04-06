import os
from google import genai
from fastapi import FastAPI, Request
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")
client = genai.Client(api_key=GEMINI_API_KEY)

def generatePrompt(arg: str, json:str, wd: str):
    return f"""
You are a virtual system explorer navigating a hierarchical file system that represents the universe. Each directory corresponds to a physical object, place, or concept (thing). You are currently exploring the directory: "{arg}".
Generate only the contents that logically and physically belong inside this directory. Follow these strict rules to maintain structural and conceptual integrity:

SCOPING RULES:
Each output you generate must be within the same scope of each other. For example, generating observable_universe and milkyway in the same directory will lead to a circular dependency, because a subdirectory of observable_universe will eventually contain milkyway again.
For this purpose, you must remain with a very specific scope for every word, where each directory generated is exactly only 1 level of extraction away from the current directory, as to leave no room for error.


GRAMMAR RULES:
- Your output should be every word separated by nothing but a comma: subdirectory,subdirectory,subdirectory,file.txt,file.txt,file.txt,file.config and nothing else. No spaces, no whitespace, no nothing.
- Your output should follow snake_case: Solar System should be solar_system, The Observable Universe should be the_observable_universe

SUBDIRECTORY RULES:
- Include subdirectories for physical entities or structures that are direct children of this object — things that are physically contained within or intrinsic to it.
- Do not include sibling directories or any content that belongs in ancestor or descendant layers — no structural repetition or circular references.
- Always reflect the natural hierarchy of the universe — be specific, local, and precise.

FILE RULES:
- Represent abstract, theoretical, or informational content specific to this level with `.txt` files (e.g., theories, models, context).
- Represent forces, behaviors, or configuration properties that apply at this scale with `.config` files.
- Keep file contents scoped to this entity only — if it governs a larger or smaller system, it belongs elsewhere.

OUTPUT FORMAT EXAMPLE:
subdirectory,subdirectory,subdirectory,file.txt,file.txt,file.txt,file.config

EXAMPLES:
-Input: Universe, Output: galaxy_clusters,cosmic_web,intergalactic_void,dark_matter_generation,general_relativity.txt,cosmic_expansioin.config,observable_limitations.config
-Input: Earth, Output: atmosphere,hydrosphere,lithosphere,biosphere,continents,oceans,human_civilization,magnetosphere.config,origin_of_life.txt,natural_cycles.txt
-Input: Saudi Arabia, Output: riyadh,mecca,medina,rub_al_khali_desert,eastern_province,oil_reserves_distribution.config,islamic_heritage_and_pilgrimage.txt,climate.config

For context generating text, the cwd is {wd}
And this is the current structure of the universe: {json}

Each entry must reflect the scale, properties, and uniqueness of {arg} only.
"""
def generateDirs(arg: str, wd:str, json:str, temperature: int):
    arg = arg.strip()


    # Send prompt to Gemini
    try:
        response = client.models.generate_content(model=GEMINI_MODEL, contents=generatePrompt(arg, json, wd), config={"temperature": temperature, "top_k": 10})
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