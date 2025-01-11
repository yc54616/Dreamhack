const express       = require('express');
const session       = require("express-session");
const RedisStore    = require("connect-redis")(session);
const crypto        = require("crypto");
const redis         = require("redis");
const cookieParser  = require('cookie-parser');
const routes        = require('./routes/index');
const path          = require('path');

const client = redis.createClient(6379,"redis");
const secret = crypto.randomBytes(64).toString();
const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);  
app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(secret))
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: secret,
    store: new RedisStore({
      client: client,
      ttl: 200
    })
  })
);

app.use('/', routes);

const FLAG = function() {
  try {
      return require('fs').readFileSync('flag').toString();
  } catch (err) {
      return 'FLAG{*****}';
  }
}();

client.set(crypto.createHash('sha512').update(crypto.randomBytes(64)).digest('hex'),FLAG); 

const server = app.listen(8000, function() {
    console.log("Started");
});