import requests

BASE_URL = "https://backend-4na6.onrender.com"

def create_universe(temp: float) -> int:
    res = requests.post(f"{BASE_URL}/create/", json={"temperature": temp})
    print(res.json())
    return int(res.json()["message"].split()[1])  # grabs universe ID

def send_command(universeid: int, command: str):
    if command == exit:
        res = requests.delete(f"{BASE_URL}/{universeid}/")
    else:
        res = requests.post(f"{BASE_URL}/command/", json={"universeid": universeid, "command": command})
    print(res.json())

def main():
    print("🌌 Welcome to UTerm CLI 🌌")
    temp = float(input("Enter universe temperature: "))
    universe_id = create_universe(temp)

    print(f"\n🪐 Universe {universe_id} created. You can now run commands like `ls`, `pwd`, `cd galaxy`, `cat file.txt`, etc.")

    while True:
        cmd = input(">>> ")
        if cmd in ("exit", "quit"):
            break
        send_command(universe_id, cmd)

if __name__ == "__main__":
    main()
