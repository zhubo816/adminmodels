const express = require('express');
const mongoose = require('mongoose');
const bodyPaeser = require('body-parser');
const passport = require('passport')
const app = express();

const users = require('./router/api/user')

mongoose.connect('mongodb://localhost:27017/admin',{useNewUrlParser:true})
    .then(() => console.log('cuccess'))
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.send('hello xdd');
});

app.use(bodyPaeser.urlencoded({
    extended: true
}));

app.use(bodyPaeser.json());

app.use("/api/users", users);

app.use(passport.initialize());

require('./config/passport')(passport);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listen ${port}`);
});
// /usr/local/var/mongodb

// #security:
// #  authorization:disabled
//
// processManagement:
//     fork = true