import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("host3.dreamhack.games", 23817))
sock.send(b"GET /h \r\n\r\n")
response = sock.recv(4096)
print(response)