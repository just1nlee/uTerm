from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from matter import Universes, Universe

app = FastAPI()
universes = Universes()

class Create(BaseModel):
    temperature: float

class Command(BaseModel):
    universeid: int
    command: str


@app.get("/")
def rootRequest():
    return {"message": "UTerm is online"}


@app.post("/create/")
def createRequest(body: Create):
    temperature = body.temperature
    universeid = universes.createUniverse(temperature)
    return {"message": f"created {universeid} with temp {temperature}"}


@app.post("/command/")
def commandRequest(body: Command):
    universeid = body.universeid
    uinput = body.command
    output = {"error": f"command {uinput} not found"}
    universe = universes.getUniverse(universeid)

    if not universe:
        return {"error": "universe not found"}
    
    if uinput == "ls":
        output = {"message": universe.ls()}
    
    elif uinput == "pwd":
        output = {"message": universe.pwd()}
    
    elif uinput == "info":
        output = {"message": universe.info()}

    elif uinput == "tree":
        return {"message": universe.tree()}
    
    elif uinput == "bigbang":
        temperature = universe.temperature
        universes.bigbang(universeid, temperature)
        output = {"message": "bigbang success"}
    
    elif uinput.startswith("cd"):
        arg = uinput[3:].strip()
        results = universe.cd(arg)
        if not results:
            output = {"message": "cd success"}
        elif results == "GEMINI_ERROR":
            raise HTTPException(status_code=404, detail="gemini failed")
        else:
            raise HTTPException(status_code=404, detail=f"cd: directory {arg} not found")
    
    elif uinput.startswith("cat"):
        arg = uinput[4:].strip()
        result = universe.cat(arg)
        if not result:
            raise HTTPException(status_code=404, detail=f"cat: file {arg} not found")
        elif result == "GEMINI_ERROR":
            raise HTTPException(status_code=404, detail="gemini failed")
        else:
            output = {"message": result}
    
    return output
    

@app.delete("/{universeid}")
def deleteRequest(universeid: int):
    universes.deleteUniverse(universeid)
    return {"message": f"deleted {universeid}"}