const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const UserSchema = mongoose.model('userlist');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
       // console.log(jwt_payload);
        UserSchema.findById(jwt_payload.id)
            .then(data=>{
                if(data){
                    return done(null,data);
                }else{
                    return done(null,false);
                }
            })
            .catch(err=>console.log(err))
    }))
}