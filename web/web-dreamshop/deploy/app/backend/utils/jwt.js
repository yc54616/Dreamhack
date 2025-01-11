const jwt = require('jsonwebtoken');
const secret_path = '/tmp/secret.key';
const fs = require('fs');

var secret;
try {
    secret = fs.readFileSync(secret_path).toString('hex');
} catch (err) {
    secret = require('crypto').randomBytes(32).toString('hex');
    fs.writeFileSync(secret_path, secret);
}

jwt.secret = secret;
jwt.exp = {
    'admin': 10,
    'user': 5 * 60
};

jwt.isadmin = function(ip) {
    if (ip == '::1') return true;
    if (ip.indexOf('127.0.0.1') > -1) return true;

    return false;
}
module.exports = jwt;