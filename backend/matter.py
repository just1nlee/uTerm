# Author: Tobias Kohn
# Description: This file defines the data structure of the universe, along with the functions used to interact with it.


from __future__ import annotations
import os
from google import genai
from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Union, Literal, Optional
from cosmos import generateDirs, generateText, generateInfo
from datetime import datetime
from dotenv import load_dotenv
import json

load_dotenv()
MAX_UNIVERSES = int(os.getenv("MAX_UNIVERSES"))


# Base class representing a textfile or directory
class File:
    def __init__(self, type: Literal['txt','dir'], name: str, parent: Optional[Directory] = None):
        self.type = type
        self.name = name
        self.parent = parent

    def to_dict(self):
        if self.type == "dir" and self.content:
            return {"name": self.name, "contents": [child.to_dict() for child in self.content]}
        else:
            return {"name": self.name}


# Class for a directory node in the universe
class Directory(File):
    def __init__(self, name: str, parent: Optional[Directory] = None):
        super().__init__("dir", name, parent)
        self.content: List[File] = []

    # Calls the Gemini API to generate its contents
    def generateContent(self, temperature: float, wd: str, json: str):
        names = generateDirs(self.name, wd, json, temperature)
        if not names:
            return 1
        dirs = []
        for name in names:
            name = name.strip()
            if name.endswith(".txt") or name.endswith(".config"):
                dirs.append(Text(name=name, parent=self))
            else:
                dirs.append(Directory(name=name, parent=self))
        self.content = dirs


# Class for a textfile node in the universe
class Text(File):
    def __init__(self, name: str, parent: Optional[Directory] = None):
        super().__init__("txt", name, parent)
        self.content: str = ""

    # Calls the Gemini API to generate its text
    def generateContent(self, pwd:str, temperature: float):
        txt = generateText(self.name, pwd, temperature)
        if txt == None:
            return 1
        
        self.content = txt
        return 0


# Class to keep track of a user's entire universe, including functionalities to interact with the universe
class Universe:
    def __init__(self, universeid: int, universenode: Directory, temperature: float):
        self.universeid: int = universeid
        self.universenode: Directory = universenode
        self.currentnode: Directory = universenode
        self.wd: str = "/universe"
        self.temperature: float = temperature
        self.lastused: datetime = datetime.utcnow()

    def _touch(self):
        self.lastused = datetime.utcnow()

    def pwd(self):
        return self.wd
    
    # Calls the Gemini API to generate information about the current directory
    def info(self):
        return generateInfo(self.currentnode.name, self.temperature)
    
    # Returns the universe in a json format
    def tree(self):
        return json.dumps(self.universenode.to_dict())

    def ls(self):
        output = ""
        for file in self.currentnode.content:
            if file.type == "dir":
                output += f" /{file.name} "
            else:
                output += f" {file.name} "

        return output
    
    # Changes into a directory, and generates content for the directory if empty
    def cd(self, directory: str):
        if directory == "..":
            if self.currentnode == self.universenode:
                return 1
            self.currentnode = self.currentnode.parent
            parts = self.wd.rstrip("/").split("/")
            self.wd = "/".join(parts[:-1]) or "/"
            return 0
        
        for file in self.currentnode.content:
            if file.type == "dir" and file.name == directory:
                if not file.content:
                    if file.generateContent(self.temperature, self.tree(), self.wd):
                        return "GEMINI_ERROR"
                self.currentnode = file
                self.wd += f"/{directory}"
                return 0
        return 1
    
    def cat(self, filename: str):
        for file in self.currentnode.content:
            if file.type == "txt" and file.name == filename:
                if not file.content:
                    if file.generateContent(self.pwd, self.temperature):
                        return "GEMINI_ERROR"
                return file.content
        return ""
     
    # Autocompletes user input, or returns matches if more than one. 
    def tab(self, input: str):
        results = []
        
        if " " not in input:
            for command in ["cd ", "cat "]:
                if command.startswith(input):
                    results.append(command)
            return results

        input_parts = input.split(" ")
        cmd = input_parts[0]
        if len(input_parts) == 1:
            arg = ""
        elif len(input_parts) == 2:
            arg = input_parts[1]
        else:
            return []

        if cmd == "cd":
            for file in self.currentnode.content:
                if file.type == "dir" and file.name.startswith(arg):
                    results.append(file.name)
        elif cmd == "cat":
            for file in self.currentnode.content:
                if file.type == "txt" and file.name.startswith(arg):
                    results.append(file.name)
        else:
            return []

        if len(results) == 1:
            return [f"{cmd} {results[0]}"]
        return results


# Class to manage all universes, allowing to create or delete a universe
class Universes:
    def __init__(self):
        self.universes: dict[int, Universe] = {}
        self.maxAvailable = MAX_UNIVERSES
        self.available = list(range(self.maxAvailable))

    def createUniverse(self, temperature: float):
        directory = Directory(name="universe")
        directory.generateContent(temperature,"", "/universe")
        universeid = min(self.available)
        universe = Universe(universeid, directory, temperature)
        self.universes[universeid] = universe
        self.available.remove(universeid)
        return universeid
    
    def getUniverse(self, universeid: int):
        if universeid not in self.universes:
            return None
        return self.universes[universeid]

    def deleteUniverse(self, universeid: int):
        del self.universes[universeid]
        self.available.append(universeid)
        return 0

    def bigbang(self, universeid: int, temperature: float):
        del self.universes[universeid]
        directory = Directory(name="universe")
        directory.generateContent(temperature, "", "/universe")
        universe = Universe(universeid, directory, temperature)
        self.universes[universeid] = universe
        return 0
