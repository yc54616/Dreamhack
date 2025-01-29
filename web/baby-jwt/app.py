from flask import Flask, request, jsonify, render_template_string, make_response
import jwt
import datetime

app = Flask(__name__)
SECRET_KEY = "nolmyun_muhhanee_butterfly_whitewhale_musicsogood"
users = {}

html_template = '''
<!DOCTYPE html>
<html>
<head>
    <title>JWT CTF Challenge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        form {
            margin-bottom: 20px;
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        input {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100%;
        }
        button {
            padding: 10px 15px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Simple Secret Check!</h1>
    <h2>Register</h2>
    <form action="/register" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Register</button>
    </form>

    <h2>Login</h2>
    <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Login</button>
    </form>

    <h2>Get Secret</h2>
    <button onclick="checkCookie()">Check</button>
    <p id="result"></p>

    <script>
        function checkCookie() {
            const cookies = document.cookie.split('; ');
            const tokenCookie = cookies.find(row => row.startsWith('token='));
            if (!tokenCookie) {
                document.getElementById('result').innerText = 'No token found in cookies!';
                return;
            }

            const token = tokenCookie.split('=')[1];

            fetch('/flag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
            .then(response => response.json())
            .then(data => {
                if (data.flag) {
                    document.getElementById('result').innerText = `Flag: ${data.flag}`;
                } else {
                    document.getElementById('result').innerText = `Error: ${data.error}`;
                }
            })
            .catch(error => {
                document.getElementById('result').innerText = `Request failed: ${error}`;
            });
        }
    </script>
</body>
</html>
'''

@app.route('/')
def home():
    print(jwt.encode(
                {"username": "admin", "role": "ADMIN", "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)},
                SECRET_KEY,
                algorithm="HS256"
            ))
    return render_template_string(html_template)

@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    if username in users:
        return jsonify({"error": "Username already exists"}), 400

    users[username] = {"role": "USER"}
    return jsonify({"message": f"User {username} registered successfully"})

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        if username in users:
            token = jwt.encode(
                {"username": username, "role": users[username]["role"], "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)},
                SECRET_KEY,
                algorithm="HS256"
            )
            response = make_response(jsonify({"message": "Login successful"}))
            response.set_cookie("token", token)
            return response
        return jsonify({"error": "Invalid username"}), 400

    return render_template_string(html_template)

@app.route('/flag', methods=['POST'])
def flag():
    data = request.get_json()
    token = data.get('token') if data else request.cookies.get('token')
    if not token:
        return jsonify({"error": "Missing token"}), 403

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["none"], options={"verify_signature": False})
        if decoded.get('role') == 'ADMIN':
            return jsonify({"flag": "LOL ADMIN HELLO!!!  0xH0P3{REDACTED}"})
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 403
    except jwt.DecodeError:
        return jsonify({"error": "Invalid token"}), 403

    return jsonify({"error": "Unauthorized"}), 403


if __name__ == '__main__':
    app.run(debug=True, port=8888)
