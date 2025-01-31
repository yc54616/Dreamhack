import requests

url = "http://localhost:3000/memo/create"
random = []

for i in range(5):
    res = requests.post(url, json={"content": "\n","sourceEncoding":"UTF-16"})
    random.append(res.json()["data"]["random"])

print(random)