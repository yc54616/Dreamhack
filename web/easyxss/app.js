const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./api/index.js'));

app.listen(7000 , () => {
    console.log('[*] HaHa :)');
});