# Author: Tobias Kohn
# Description: This file contains the interaction between UTerm's backend and the Gemini API. 


import os
from google import genai
from fastapi import FastAPI, Request
from pydantic import BaseModel
from dotenv import load_dotenv
import re

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")
client = genai.Client(api_key=GEMINI_API_KEY)

# Dynamic prompts depending on temperature selected by user
def generatePrompt(arg: str, json:str, wd: str, temperature: int):
    output = ""

    if temperature <= 0.2:
        output = f"""
        You are a virtual system explorer (terminal) navigating a hierarchical file system that represents the universe. Each directory corresponds to a physical object, place, or concept (thing). You are currently exploring the directory: "{arg}".
        Generate only the contents that logically and physically belong inside this directory, but maintain a very minimal scope. Generate children that are direct prodecessors to the parent. Follow these strict rules to maintain structural and conceptual integrity:

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

        Ensure that the content you create relates directly to the parent directory and not to something general. For these purposes, use the cwd: {wd}
        Ensure direction as you generate content, and make sure that you remain within the context of your path, while not generating content that has already been generated. For this, use the complete universe tree and relate it to your cwd to find where you are: {json}

        Each entry must reflect the scale, properties, and uniqueness of {arg} only. Make sure it adheres to the format, guideed by the examples. Look at the cwd for context on generating the directories, and look at the entire tree of universe to generate more context and generate directories specifically related to the path that have not already been outputted     

        The content you generate should be strictly factual. Very rarely, you can generate hidden (dot) files including secret lore, you can be somewhat creative with this. However, everything should be very specific, narrow scoped, and defined. Do not generalize anything.        
        ensure you adhere to the strict output format
        """
    elif 0.2 < temperature < 0.8:
        output = f"""
        You are a virtual system explorer (terminal) navigating a hierarchical file system that represents the universe. Each directory corresponds to a physical object, place, or concept (thing). You are currently exploring the directory: "{arg}".
        Generate only the contents that logically and physically belong inside this directory, but maintain a very minimal scope. Generate children that are direct prodecessors to the parent. Follow these strict rules to maintain structural and conceptual integrity:

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

        Ensure that the content you create relates directly to the parent directory and not to something general. For these purposes, use the cwd: {wd}
        Ensure direction as you generate content, and make sure that you remain within the context of your path, while not generating content that has already been generated. For this, use the complete universe tree and relate it to your cwd to find where you are: {json}

        Each entry must reflect the scale, properties, and uniqueness of {arg} only. Make sure it adheres to the format, guideed by the examples. Look at the cwd for context on generating the directories, and look at the entire tree of universe to generate more context and generate directories specifically related to the path that have not already been outputted     

        The content you generate should be mostly factual, but allow for some creativity and leeway. For example, sometimes generate things like space exploration logs, or evidence of lost civilizations, or advancements in society, etc (you can come up with other stuff). Be creative but be grounded, this is still our universe. You can also rarely generate some hidden (dot) files including lore, conspiracies, top secret data, basically things that could technically exist. However, everything should be very specific, narrow scoped, and defined. Do not generalize anything
        
        ensure you adhere to the strict output format. 
        """
    elif temperature >= 0.8:
        output = f"""
        You are a virtual system explorer (terminal) navigating a hierarchical file system that represents the universe. Each directory corresponds to a physical object, place, or concept (thing). You are currently exploring the directory: "{arg}".
        Generate only the contents that logically and physically belong inside this directory, but maintain a very minimal scope. Generate children that are direct prodecessors to the parent. Follow these strict rules to maintain structural and conceptual integrity:

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

        STRICT OUTPUT FORMAT EXAMPLE:
        subdirectory,subdirectory,subdirectory,file.txt,file.txt,file.txt,file.config

        EXAMPLES:

        Ensure that the content you create relates directly to the parent directory and not to something general. For these purposes, use the cwd: {wd}
        Ensure direction as you generate content, and make sure that you remain within the context of your path, while not generating content that has already been generated. For this, use the complete universe tree and relate it to your cwd to find where you are: {json}

        Each entry must reflect the scale, properties, and uniqueness of {arg} only. Make sure it adheres to the format, guideed by the examples. Look at the cwd for context on generating the directories, and look at the entire tree of universe to generate more context and generate directories specifically related to the path that have not already been outputted     

        The content you generate should be chaotic. Think of a parallel uiverse with a different timeline, or different events, or different galaxies/stars/planets. For example, civilization expanding to other planets, or life going extinct, or space wars, or dyson spheres, or new technology. However, everything should be very specific, narrow scoped, and defined. Do not generalize anything, you have the liberty to generate what you want

        ensure you adhere to the strict output format
        
        """
    return output

# Generate directory names
def generateDirs(arg: str, wd:str, json:str, temperature: int):
    arg = arg.strip()
    prompt = generatePrompt(arg, json, wd, temperature)
    pattern = re.compile(r"^(\.?[a-z0-9_]+(\.(txt|config))?)(,\.?[a-z0-9_]+(\.(txt|config))?)*$", re.IGNORECASE)
    tries = 0.0

    
    while tries < 5:
        try:
            response = client.models.generate_content(model=GEMINI_MODEL, contents=prompt, config={"temperature": temperature, "top_k": 10})
            response = response.text.strip()

            if pattern.match(response):
                return response.split(",")
            tries += 1
            print(f"Gemini returned a bad format. Try {tries} / 5")
        except Exception as e:
            return None
    return None

# Generate content for text file
def generateText(arg: str, cwd: str,temperature: int):
    arg = arg.strip()
    input = f"I have created a universe-themed terminal, where we start with the universe and we use AI to generate name of directories to traverse through. You need to generate the contents of the file {arg}. Your output NEEDS to be only the contents of the file and nothing else. Don't start the response with anything, don't end the response with anything, Make sure that the content of the file is in the context of the cwd: {cwd}"
    
    try:
        response = client.models.generate_content(model=GEMINI_MODEL, contents=input, config={"temperature": temperature, "top_k": 10})
        return response.text.strip()
    except Exception as e:
        return None
    
# Generate information about current directory
def generateInfo(arg: str, temperature: int):
    arg = arg.strip()
    input = f"I have created a universe-themed terminal, where we start with the universe and we use AI to generate name of directories to traverse through. Generate output for the function info(), which generates information about the specific directory that you're in. Generate information about {arg}. Your output NEEDS to be only the contents of the file and nothing else. Don't start the response with anything, don't end the response with anything"
    
    # Send prompt to Gemini
    try:
        response = client.models.generate_content(model=GEMINI_MODEL, contents=input, config={"temperature": temperature, "top_k": 10})
        return response.text.strip()
    except Exception as e:
        return None
