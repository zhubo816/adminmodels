const express = require('express');
const mongoose = require('mongoose');
const bodyPaeser = require('body-parser');
const passport = require('passport')
const app = express();

const users = require('./router/api/user')

mongoose.connect('mongodb://zhubo:111111@localhost:27017/admin',{useNewUrlParser:true})
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

// docker run -p 27017:27017 -v <LocalDirectoryPath>:/data/db --name docker_mongodb -d mongo
//
// docker run -p 27017:27017 -v /data/mongodb0:/data/db --name mongodb-server0  -d docker_mongo --auth
//
// docker run --name mongo -p 27017:27017 -v /home/data/db:/data/db -d mongo
//
// sudo docker run -it mongo mongo --host 123.56.11.141 --port 27017
//
// db.createUser({ user: 'zhubo', pwd: '111111', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

//
// docker run -it --rm --link mongodb_docker:mongo mongo mongo --host mongo -u zhubo -p 111111 --authenticationDatabase zhubo
//
// docker run -it --rm --link mongodb_docker:mongo mongo mongo --host mongo -u zhubo -p 111111 --authenticationDatabase admin
//
// db.grantRolesToUser("zhubo", [ { role:"dbOwner", db:"admin"} ]) ;