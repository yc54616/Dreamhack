const express = require('express');
const app = express();
const port = 8888;
const session = require('express-session');
const crypto = require('crypto');
const dns = require('dns').promises;
const { FLAG } = require('./flag.js');

dns.setServers([
  "8.8.8.8"
]);

const morgan = require('morgan');
const fs = require('fs')
const path = require('path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

function isUpperCase(str) {
  return /^[A-Z]+$/.test(str);
}

function generateRandomKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

function generateRandomIP() {
  const octet = () => crypto.randomInt(0, 256);
  return `${octet()}.${octet()}.${octet()}.${octet()}`;
}


app.use(express.urlencoded({ extended: false }));

app.use(session({
	secret: generateRandomKey(100),
	resave: false,
	saveUninitialized: false
}));

app.use(async (req, res, next) => {
	if (!isUpperCase(req.method)) {
		if (req.session.start_time === undefined)
			return res.send("not allowed");
		
		var is = Date.now() - req.session.start_time;
		if (Date.now() - req.session.start_time > 3000)
			return res.send("timeout");
		req.session.start_time -= 5000
		
		const domains = req.query?.domains;	  
		console.log("domains", domains)
		console.log("domains?.length", domains?.length)
		if (!(Array.isArray(domains) && domains?.length === 100 && domains.every(d => typeof d === 'string')))
			return res.send("check ur domains");
		
		let real_ips;
		try {
			console.log("try")
			real_ips = await Promise.all(domains.map(dns.resolve4));
			console.log("real_ips",real_ips)
		} catch (e) {
			console.log("catch",e)
			return res.send("cheer up !");
		}
		
		if (real_ips.every((real_ip, i) => real_ip[0] === req.session.ips[i])){
			console.log("reverse domain success");
			return res.send(FLAG);
		}
		else
			return res.send('reverse domain fail, cheer up !');
	}
	
	next();
});

app.get('/', (req, res) => {
	return res.send('hi');
});

app.get('/start', (req, res) => {
	const ips = Array.from({ length: 100}, generateRandomIP);
	
	req.session.ips = ips;
	req.session.start_time = Date.now();
	console.log("ips",ips)

	return res.send(ips);
});

app.listen(port, () => {
	console.log(`server is on http://localhost:${port}`);
});