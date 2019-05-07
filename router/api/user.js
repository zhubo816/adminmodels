const express = require('express');
const router = express.Router();
const userdb = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/test', (req, res) => {
    res.json({msg: 'user ok'})
})

router.post('/reg', (req, res) => {
    //   console.log(req.body);
    userdb.findOne({
        name: req.body.name
    }).then(user => {
        if (user) {
            return res.status(400).json({msg: '有了'})
        } else {
            const newuser = new userdb({
                name: req.body.name,
                password: req.body.password
            })

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newuser.password, salt, function (err, hash) {
                    if (err) throw err;
                    newuser.password = hash;
                    newuser.save()
                        .then((user) => res.json({"msg":"注册成功"}))
                        .catch((err) => console.log(err));
                })
            })
        }

    })
})

router.post('/login', (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    console.log(username);
    userdb.findOne({name: username})
        .then(data => {
            if (!data) {
                return res.status(404).json({msg: ' 没有'});
            }
            bcrypt.compare(password, data.password)
                .then(wordType => {
                    const rule = {id:data.id,name:data.name}
                    if (wordType) {
                        jwt.sign(rule,'secret',{expiresIn: 3600},(err,token)=>{
                            res.json({
                                success:true,
                                token:'Bearer ' + token
                            })
                        })
                        //res.json({msg: "ok"})
                    } else {
                        return res.status(404).json({msg: "fail"})
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })

})


router.get('/curr',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send({msg:req.body})
})

router.get('/find',passport.authenticate('jwt',{session:false}),(req,res)=>{
    userdb.find()
        .then(data=>{
            res.json(data)
        }).catch(err=>console.log(err))
})



module.exports = router;