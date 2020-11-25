var express = require('express');
var http = require('http');

var port = 8999;
var app = express();
const flash = require('connect-flash');
var cookieParser = require('cookie-parser')
var server = http.createServer(app);
function checkAuth(req, res, next) {
    console.log('checkAuth ' + req.url);
    // don't serve /secure to those not logged in
    if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }
    next();
}
app.use(flash());
app.use(cookieParser());
app.use(express.session({ secret: 'example' }));
app.use(express.bodyParser());
app.use(checkAuth);
app.use(app.router);
app.set('view engine', 'jade');
app.set('view options', { layout: false });
require('./lib/routes.js')(app);
app.listen(port);
console.log('Node listening on port %s', port);
