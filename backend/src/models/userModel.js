const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    },
    image:{
        type:String
    }


})
module.exports = mongoose.model("User",userSchema)