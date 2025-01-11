var config = {};

config.HOST = "127.0.0.1:8000";

config.addSessionData = function(obj, key, value) {
    Object.assign(this, obj);
    this[key] = value;
}

config.login = function(id, pw, email, uid) {
    return {"name":id,"pw":pw,"email":email,"profile":{"url":`http://127.0.0.1:8000/view/${ uid }`,"isRender":false}};
}

config.isadmin = function(ip) {
    if (ip == '::1') return true;
    if (ip.indexOf('127.0.0.1') > -1) return true;

    return false;
}

module.exports = config;
