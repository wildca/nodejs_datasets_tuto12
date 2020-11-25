var util = require('util');
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });
    app.get('/welcome', function (req, res, next) {
        res.render('welcome');
    });
    app.get('/secure', function (req, res, next) {
        res.render('secure');
    });
    app.get('/login', function (req, res, next) {
        res.render('login', {
            flash: req.flash()
        });
    });
    app.post('/login', function (req, res, next) {
        // you might like to do a database look-up or something more scalable here
        if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
            req.session.authenticated = true;
            res.redirect('/secure');
        } else {
            req.flash('error', 'Username and password are incorrect');
            res.redirect('/login');
        }
    });
    app.get('/logout', function (req, res, next) {
        delete req.session.authenticated;
        res.redirect('/');
    });
};