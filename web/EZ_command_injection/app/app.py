#!/usr/bin/env python3
import subprocess
import ipaddress
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/ping', methods=['GET'])
def ping():
    host = request.args.get('host', '')
    print(host)
    try:
        addr = ipaddress.ip_address(host)
        print(addr)
    except ValueError:
        error_msg = 'Invalid IP address'
        print(error_msg)
        return render_template('index.html', result=error_msg)

    cmd = f'ping -c 3 {addr}'
    try:
        output = subprocess.check_output(['/bin/sh', '-c', cmd], timeout=8)
        return render_template('index.html', result=output.decode('utf-8'))
    except subprocess.TimeoutExpired:
        error_msg = 'Timeout!!!!'
        print(error_msg)
        return render_template('index.html', result=error_msg)
    except subprocess.CalledProcessError:
        error_msg = 'An error occurred while executing the command'
        print(error_msg)
        return render_template('index.html', result=error_msg)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
