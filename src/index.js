const config = require('../config.json');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const mysql = require('mysql');

const dbConfig = {
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
    charset: config.database.charset
};


app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(session({
    secret: "oksdfbfisadof",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 31556952000}
}));

app.use(passport.initialize());
app.use(passport.session());

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
};


const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password
});

connection.connect(function(err) {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, function (err) {
        connection.end();
    
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        
        require('./backend')(app, dbConnection);

        app.get('/', function(req, res) {
            res.render('index');
        });

        app.get('/logout', function(req, res, next) {
            req.logout(function(err) {
                if(err) { return next(err); }
                res.redirect("/");
            });
        });

        app.get('/dashboard', isAuthenticated, (req, res) => {
            res.render('dashboard', { user: req.user });
        });


        app.get('*', function(req, res){
            res.render('_partials/_errors/404.ejs');
        });

        app.listen(config.site.port, function() {
            console.log(`Server running on port ${config.site.port}`);
        });
    });
});