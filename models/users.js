//创建一个users表

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserSchema = new schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = userlist = mongoose.model("userlist",UserSchema)