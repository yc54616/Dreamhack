const express = require('express');
const router = express.Router();
const jwt = require('../utils/jwt');
const {
    request
} = require('../app');
var last = 0;

const puppeteer = require('puppeteer');

const items = [{
    "id": 1,
    "name": "Web Hacking 강의",
    "price": 1024,
    "detail": "<b>Web Hacking</b>에서는 웹 서비스의 기초지식부터 시작하여 웹 환경에서 발생할 수 있는 다양한 취약점의 종류에 대해서 알아보고 공격에 방어할 수 있는 방법들을 소개합니다.",
    "poster": "//kr.object.ncloudstorage.com/dreamhack-content/curriculum/e0b729e4e48a00c06faf734c17590de0fb09216afd39574cee38ae024a4eed9a.jpg"
}, {
    "id": 2,
    "name": "System Exploitation Fundamental 강의",
    "price": 100,
    "detail": "<b>System Exploitation Fundamental</b>에서는 리눅스 시스템과 바이너리에서 발생할 수 있는 여러 취약점과 취약점을 공격하는 방법에 대해 기초부터 심화까지 차례대로 배울 수 있습니다.",
    "poster": "//kr.object.ncloudstorage.com/dreamhack-content/curriculum/bdcc8d59a4d671efe4c63aa0a3c106af7ea657635540b2b5bfe23da2b8fa273f.jpg"
}, {
    "id": 3,
    "name": "Reverse Engineering 강의",
    "price": 1,
    "detail": "<b>Reverse Engineering</b>커리큘럼에서는 Windows OS 환경과 Intel x86-64 아키텍처를 기준으로 하여 어셈블리 기초부터 복잡한 바이너리에 대한 접근법까지 폭넓게 다룹니다.",
    "poster": "//kr.object.ncloudstorage.com/dreamhack-content/curriculum/64ad1e26ab8a9cd1e12a637e2f8492793018023697f60dc8761b2e6f20606625.png"
}, {
    "id": 4,
    "name": "Flag",
    "price": 999999999,
    "detail": "<b>This is Flag</b>",
    "poster": "//i.imgur.com/7rXBYgT.jpg"
}];

const secret_data = {
    1: 'https://dreamhack.io/lecture/curriculums/1',
    2: 'https://dreamhack.io/lecture/curriculums/2',
    3: 'https://dreamhack.io/lecture/curriculums/3',
    4: 'DH{...}' // FLAG: DH{32alphanumeric}
}

const users = [{
    "id": 1,
    "uid": "admin",
    "upw": jwt.secret,
    "amount": 99999999999999
}, {
    "id": 2,
    "uid": "guest",
    "upw": "dreamhack1234",
    "amount": 12345
}];

router.get('/', function(req, res, next) {
    res.send('hello');
});

router.get('/debug/:data', function(req, res, next) {
    res.set('Content-Type', 'text/plain').send(req.params.data.substr(0, 22));
});

const login = function(uid, upw) {
    var user = users.find(user => user['uid'] == uid);
    if (user && user['upw'] == upw) {
        user = Object.assign({}, user);
        delete user['upw'];
        return user;
    } else {
        return null;
    }
}

router.post('/login', function(req, res, next) {
    const {
        uid,
        upw
    } = req.body;

    var user = login(uid, upw);
    if (user) {
        if (uid == 'admin') {
            if (jwt.isadmin(req.connection.remoteAddress)) {
                res.send({
                    'token': jwt.sign(user, jwt.secret, {
                        expiresIn: jwt.exp['admin']
                    })
                });
            } else {
                res.status(403).send('noperm');
            }
        } else {
            res.send({
                'token': jwt.sign(user, jwt.secret, {
                    expiresIn: jwt.exp['user']
                })
            });
        }
    } else {
        res.status(403).send('check id/pw');
    }
});

router.post('/report', function(req, res, next) {
    const {
        path
    } = req.body;

    if (req.session) {
        if (path.indexOf('//') < 0) {
            var url = 'http://localhost:3000';
            var input_url = url + path;
            var now = Date.now() / 1000;
            if ((now - last) > (jwt.exp['admin'] + 12)) {
                last = now;
                (async() => {
                    var browser, page;
                    browser = await puppeteer.launch({
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
                    page = await browser.newPage();
                    await page.setCacheEnabled(false);
                    page.goto(url + '/#/login');
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    page.goto(`javascript:login({"uid": "admin", "upw": "${jwt.secret}"})`)
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    page.goto(input_url)
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    await browser.close();
                })();
                res.send('good');
            } else {
                res.status(403).send('wait ' + (jwt.exp['admin'] + 12) + 'sec');
            }
        } else {
            res.status(403).send('check url');
        }
    } else {
        res.status(403).send('no login');
    }
});

router.get('/items', function(req, res, next) {
    res.send(items);
});

router.get('/user/info', function(req, res, next) {
    if (req.session) res.send(req.session);
    else res.status(403).send('');
});

router.get('/:id(\\d+)/info', function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    var item = items.find(item => item.id == id);
    if (item) {
        res.send(item);
    } else {
        res.status(403).send('');
    }
});

router.post('/:id(\\d+)/buy', function(req, res, next) {
    if (req.session) {
        var id = parseInt(req.params.id, 10);
        var item = items.find(item => item.id == id);
        if (item) {
            if (req.session.amount >= item.price) {
                req.session.amount -= item.price;
                delete req.session.iat;
                delete req.session.exp;
                res.send({
                    'data': secret_data['' + id],
                    'token': jwt.sign(req.session, jwt.secret, {
                        expiresIn: 5 * 60
                    })
                });
            } else {
                res.status(403).send('session.amount < item.price');
            }
        } else {
            res.status(403).send('check item id');
        }
    } else {
        res.status(403).send('no login');
    }
});

module.exports = router;