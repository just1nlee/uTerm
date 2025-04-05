from pydantic import BaseModel
from fastapi import FastAPI, HTTPException

app = FastAPI()

class Input(BaseModel):
    command: str


@app.post("/create/")
def createRequest(body: Input):
    temperature = body.command
    return {"message": f"created with temp {temperature}"}


@app.post("/command/")
def commandRequest(body: Input):
    uinput = body.command
    
    if uinput == "ls":
        return {"message": "ls command"}
    
    elif uinput == "pwd":
        return {"message": "pwd command"}
    
    elif uinput == "info":
        return {"message": "info command"}
    
    elif uinput == "bigbang":
        return {"message": "bigbang command"}
    
    elif uinput.startswith("cd"):
        arg = uinput[3:]
        return {"message": f"cd to {arg}"}
    
    elif uinput.startswith("cat"):
        arg = uinput[4:]
        return {"message": f"cat to {arg}"}


@app.delete("/{universeid}")
def deleteRequest(universeid: str):

    return {"message": f"deleted {universeid}"}