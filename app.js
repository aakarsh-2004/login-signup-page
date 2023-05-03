//jshint esversion:6
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// console.log(process.env.API_KEY);

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/whisperDB', {useNewUrlParser: true, useUnifiedTopology: true});
const encrypt = require('mongoose-encryption');

detailsSchema = new mongoose.Schema({
    email: String,
    password: String
});

detailsSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedField: ['password']});

var Detail = mongoose.model('Detail', detailsSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    Detail.find().exec()
        .then((e) => {
            e.forEach((ele) => {
                if(ele.email === req.body.username && ele.password === req.body.password) {
                    res.render('secrets');
                } else {
                    res.write('Error');
                    res.send();
                }
            })
        })
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    var myUserName = req.body.username;
    var myPassword = req.body.password;
    const User = new Detail({
        email: myUserName,
        password: myPassword
    });
    User.save();
    res.write("Thank you for registering kindly login to use the website");
    res.send();
})

app.listen(3000, (req, res) => {
    console.log("Server started on port 3000");
});