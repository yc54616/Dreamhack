from flask import Flask, request, send_file
from os import urandom, path
from json import loads, dumps
from hmac import new
from hashlib import sha256

app = Flask(__name__)
app.secret_key = urandom(32)

coupons_data = [
    {
    "name": "welcome",
    "value": "10",
    "admin": "1",
    "key": "a221a4d1e9f12e33cf999cf5d603ca80",
    "coupon": "34a27d00d8bc51ac025df6033ef2927ef015161dbee2c15611ec6907be04bbcf",
    },
]
suffix = 0

@app.route('/', methods=["GET"])
def show_source():
    src_path = path.abspath(__file__)
    return send_file(src_path, mimetype='text/plain')

@app.route("/generate", methods=["GET"])
def generate():
    global suffix
    suffix += 1
    secret_key = bytes.hex(urandom(16))

    with open(path.join("./keys/", f"key_{suffix}"), "w") as f:
        f.write(secret_key)
        data = request.args.get("data", None)
        if not data:
            return {"result": False, "msg": "data is missing."}
    
    key_value = data.split("_")
    # name_asdfasdf_value_10_admin_0
    if key_value[0] != "name" or key_value[2] != "value" or key_value[4] != "admin":
        return {"result": False, "msg": "Invalid data."}
    
    if key_value[3] != "10" or key_value[5] != "0":
        key_value[3] = "10"
        key_value[5] = "0"

    dict_data = {key_value[i]: key_value[i + 1] for i in range(0, len(key_value), 2)}
    print(dict_data)
    coupon_data_bytes = dumps(dict_data).encode()
    print(coupon_data_bytes)
    coupon = new(secret_key.encode(), coupon_data_bytes, sha256).hexdigest()
    dict_data["key"] = secret_key
    dict_data["coupon"] = coupon
    coupon_data = dict_data
    coupons_data.append(coupon_data)
    print(coupons_data)
    return {"result": True, "msg": "Coupon generated successfully."}

@app.route("/verify", methods=["GET"])
def verify():
    coupon = request.args.get("coupon", None)
    if not coupon:
        return {"result": False, "msg": "coupon is missing."}
    
    for coupon_data in coupons_data:
        coupon_value = coupon_data.get("coupon", None)

    if coupon == coupon_value:
        return {
        "result": True,
        "msg": "Coupon is valid.",
        "coupon_data": coupon_data,
        }
    else:
        pass

    return {"result": False, "msg": "Coupon is invalid."}

@app.route("/key", methods=["GET"])
def key():
    key_file = request.args.get("file")
    key = ""
    file_path = path.join("./keys/" + key_file)
    try:
        with open(file_path, "r") as f:
            for line in f:
                key += line
        return {"result": True, "msg": f"{key}"}
    except FileNotFoundError:
        return {"result": False, "msg": "Key file not found."}

@app.route("/get_coupon", methods=["GET"])
def get_coupon():
    key = request.args.get("key", None)
    if not key:
        return {"result": False, "msg": "key is missing."}
    for coupon_data in coupons_data:
        key_value = coupon_data.get("key", None)
    if key == key_value:
        return {"result": True, "coupon_data": coupon_data}
    else:
        pass
    return {"result": False, "msg": "The coupon does not exist."}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)