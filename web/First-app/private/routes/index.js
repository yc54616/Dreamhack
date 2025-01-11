const url 				= require("url");
const express           = require('express');
const router            = express.Router();
const config            = require("../config");
const Curl 				= require("node-libcurl").Curl;
const redis             = require("redis");
const uuid              = require("uuid4");
const { fsyncSync } = require("fs");

const client = redis.createClient(6379,"redis");

router.get("/", (req, res) => {
    let sess = req.session;
    if(!sess.user)
        return res.redirect("/login");
    let logined = sess.user.name;
    let e = "";
    profile_URL = url.parse(sess.user.profile.url);
    if(!profile_URL.host.endsWith(config.HOST) || profile_URL.protocol.toLowerCase() == "file:") {
       return res.render("index", {
           e: "Nope!",
           logined
       });
    }

    if(!sess.user.profile.isRender) {
        return res.render("index", {
            e: false,
            u: sess.user,
            r: "Only for allowed user",
            logined
        });
    }

    let curl = new Curl();
    curl.setOpt("URL", profile_URL.href);
    curl.on("data", (chunk) => {
        return res.render("index", {
            e: false,
            u: sess.user,
            r: chunk,
            logined
        });
    });
    curl.on("error", (chunk) => {
        return res.render("index", {
            e: "Error..",
            logined
        });
    });

    curl.perform();
});

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect(302,'/');
    }
	return res.render("index",{ logined: false });
});


router.post('/login', (req, res) => {
    if (req.session.user) {
        res.redirect(302,'/');
    }
	let { username, password, email } = req.body;

	if (username && password) {
        const uid = uuid();
		req.session.user = config.login(username, password, email, uid);
        client.set(uid, JSON.stringify(req.session.user));
        return res.redirect(302,'/');
	}

	return res.render("/",{ 
        logined: false,
        e : "Error.."
     });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/')
})

router.get("/view/:pid", (req, res) => {
    if(config.isadmin(req.connection.remoteAddress)){
        client.get(req.params.pid,(err,val) => {
		if(val){
            		return res.send(val);
        	} else if(err) {
            		return res.send(err);
        	}
	});	
    }
    else {
        return res.send('only localhost is available.');
    }
});

router.post("/add", (req, res) => {
    sess = req.session;
    if(!sess)
        return res.redirect("/login");

    if(!req.body.key || !req.body.value)
        return res.redirect("/");

    let key = req.body.key;
    let value = req.body.value; 

    let filter = /[_\\\/\|'"` \n\r\(\)]/;
    if(value.length >= 25) {
        return res.json({
            c: -1,
            e: "Too long"
        });
    }
    if((key.length >= 5) && filter.test(key)) {
        return res.json({
            c: -1,
            e: "Invalid char"
        });
    }

    sess.user = new config.addSessionData(sess.user, key, value);
    return res.json({
        c: 0
    });

});

module.exports = router;
