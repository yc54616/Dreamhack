const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const app = express();
const jwt = require('./utils/jwt');

const cors = require('cors');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    const token = req.headers['token'];
    if (token && token != 'null') {
        try {
            var session = jwt.verify(token, jwt.secret);
            if (session && session.uid && session.uid == 'admin' && !jwt.isadmin(req.connection.remoteAddress)) {;
            } else {
                req.session = session;
            }
        } catch (err) {
            console.log('jwt verify fail');
        }
    }
    next();
})

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    res.status(err.status || 500).send('err');
});

module.exports = app;