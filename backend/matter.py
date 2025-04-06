from __future__ import annotations
import os
from google import genai
from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Union, Literal, Optional
from cosmos import generateDirs, generateText, generateInfo
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()
MAX_UNIVERSES = int(os.getenv("MAX_UNIVERSES"))


class File:
    def __init__(self, type: Literal['txt','dir'], name: str, parent: Optional[Directory] = None):
        self.type = type
        self.name = name
        self.parent = parent


class Directory(File):
    def __init__(self, name: str, parent: Optional[Directory] = None):
        super().__init__("dir", name, parent)
        self.content: List[File] = []

    def generateContent(self, temperature: float):
        names = generateDirs(self.name, temperature)
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


class Text(File):
    def __init__(self, name: str, parent: Optional[Directory] = None):
        super().__init__("txt", name, parent)
        self.content: str = ""

    def generateContent(self, temperature: float):
        txt = generateText(self.name, temperature)
        if txt == None:
            return 1
        
        self.content = txt
        return 0


class Universe:
    def __init__(self, universeid: int, universenode: Directory, temperature: float):
        self.universeid: int = universeid
        self.universenode: Directory = universenode
        self.currentnode: Directory = universenode
        self.wd: str = "/universe"
        self.temperature: float = temperature
        self.lastused: datetime = datetime.utcnow()

    def pwd(self):
        return self.wd
    
    def info(self):
        return generateInfo(self.currentnode.name, self.temperature)
    
    def tree(self):
        #finish
        return 0

    def ls(self):
        output = ""
        for file in self.currentnode.content:
            if file.type == "dir":
                output += f" /{file.name} "
            else:
                output += f" {file.name} "

        return output
    
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
                    if file.generateContent(self.temperature):
                        return "GEMINI_ERROR"
                self.currentnode = file
                self.wd += f"/{directory}"
                return 0
        return 1
    
    def cat(self, filename: str):
        for file in self.currentnode.content:
            if file.type == "txt" and file.name == filename:
                if not file.content:
                    if file.generateContent(self.temperature):
                        return "GEMINI_ERROR"
                return file.content
        return ""


class Universes:
    def __init__(self):
        self.universes: dict[int, Universe] = {}
        self.maxAvailable = MAX_UNIVERSES
        self.available = list(range(self.maxAvailable))

    def createUniverse(self, temperature: float):
        directory = Directory(name="universe")
        directory.generateContent(temperature)
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
        directory.generateContent(temperature)
        universe = Universe(universeid, directory, temperature)
        self.universes[universeid] = universe
        return 0

