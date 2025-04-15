# Author: Tobias Kohn
# Decription: This file serves as the backend API for UTerm.
# It exposes endpoints for creating and deleting a universe, and for executing a command and autocompleting with tab.


from pydantic import BaseModel
from fastapi import FastAPI, Request, HTTPException, Query, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from matter import Universes, Universe
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
import asyncio

load_dotenv()
MAX_RPS = os.getenv("MAX_RPS")
ALLOWED_ORIGINS = ["https://www.universeterminal.com", "https://www.universeterminal.com/temp", "https://www.universeterminal.com/terminal"]

# Cleanup tool to delete inactive universes after 5 minutes
@asynccontextmanager
async def lifespan(app: FastAPI):
    async def cleanup_loop():
        while True:
            await asyncio.sleep(60)
            now = datetime.utcnow()
            for uid, universe in list(universes.universes.items()):
                if (now - universe.lastused) > timedelta(minutes=5):
                    universes.deleteUniverse(uid)
                    print(f"[CLEANUP] Universe {uid} deleted due to inactivity")

    task = asyncio.create_task(cleanup_loop())
    yield
    task.cancel()
    
app = FastAPI(lifespan=lifespan)


# Browser level protection to verify origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])


# Verify origin
async def verify_origin(request: Request):
    origin = request.headers.get("origin")
    if origin not in ALLOWED_ORIGINS:
        print(f"[BLOCKED] Unauthorized origin: {origin}")
        raise HTTPException(status_code=403, detail="Origin not allowed")


# Verify API key
def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("BACKEND_API_KEY"):
        print(f"[BLOCKED] Invalid API key: {x_api_key}")
        raise HTTPException(status_code=403, detail="Invalid API key")


# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(status_code=429, content={"detail": "Too many requests"})


# Pydantic models for input
class Create(BaseModel):
    temperature: float
class Command(BaseModel):
    universeid: int
    command: str


# Initializes universes manager
universes = Universes()


# Endpoint for root
@app.get("/")
def rootRequest():
    return {"message": "UTerm is online"}


# Endpoint for creating a universe
@app.post("/create/")
@limiter.limit(MAX_RPS)
async def createRequest(request: Request, body: Create, _: None = Depends(verify_api_key), __: None = Depends(verify_origin)):
    temperature = body.temperature
    universeid = universes.createUniverse(temperature)
    universes.getUniverse(universeid)._touch()
    return {"message": f"{universeid}"}


# Endpoint for tab suggestion/autocomplete
@app.get("/tab/")
@limiter.limit(MAX_RPS)
async def tabRequest(request: Request, universeid: int = Query(...), command:str = Query(...), _: None = Depends(verify_api_key), __: None = Depends(verify_origin)):
    universe = universes.getUniverse(universeid)
    if not universe:
        return {"error": "universe not found"}
    results = universe.tab(command)
    return {"message": results}


# Endpoint for processing command
@app.post("/command/")
@limiter.limit(MAX_RPS)
async def commandRequest(request: Request, body: Command, _: None = Depends(verify_api_key), __: None = Depends(verify_origin)):
    universeid = body.universeid
    uinput = body.command
    universe = universes.getUniverse(universeid)
    if not universe:
        return {"error": "universe not found"}
    
    universe._touch()
    
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

    else:
        raise HTTPException(status_code=404, detail=f"command {uinput} not found")
    
    
    return output
    

# Endpoint for deleting universe
@app.delete("/{universeid}")
@limiter.limit(MAX_RPS)
async def deleteRequest(request: Request, universeid: int, _: None = Depends(verify_api_key), __: None = Depends(verify_origin)):
    universes.deleteUniverse(universeid)
    return {"message": f"deleted {universeid}"}
