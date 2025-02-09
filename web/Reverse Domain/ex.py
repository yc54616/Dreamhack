import socket

host = 'host3.dreamhack.games'
port = 16606

# 소문자 메서드를 사용한 요청
request = b"GET / HTTP/1.1\r\nHost: target.com\r\n\r\n"

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((host, port))
    s.sendall(request)
    response = s.recv(4096)

print(response.decode())
