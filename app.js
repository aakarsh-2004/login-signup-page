//jshint esversion:6
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const md5 = require('md5');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// console.log(process.env.API_KEY);
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(session ({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/whisperDB', {useNewUrlParser: true, useUnifiedTopology: true});

detailsSchema = new mongoose.Schema({
    email: String,
    password: String
});

detailsSchema.plugin(passportLocalMongoose);

const Detail = mongoose.model('Detail', detailsSchema);

passport.use(Detail.createStrategy());
passport.serializeUser(Detail.serializeUser());
passport.deserializeUser(Detail.deserializeUser());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // const finalUsername = req.body.username;
    // const finalPassword = req.body.password;
    // Detail.findOne({email: finalUsername}).exec()
    //     .then((e) => {
    //         bcrypt.compare(finalPassword, e.password, (err, result) => {
    //             if (result === true) {
    //                 res.render("secrets");
    //             } else {
    //                 console.log("Error");
    //             }
    //         })
    // })
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    // var myUserName = req.body.username;
    // var myPassword = req.body.password;
    // bcrypt.hash(myPassword, saltRounds, (err, hash) => {
    //     const User = new Detail({
    //         email: myUserName,
    //         password: hash
    //     });
    //     User.save();
    //     res.render('secrets');
    // });
});

app.get('/logout', (req, res) => {
    res.render('home');
});

app.listen(3000, (req, res) => {
    console.log("Server started on port 3000");
});