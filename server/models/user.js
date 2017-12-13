var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name:{
        type:String,
        required:true,
        minlength:4,
        trim:true
    },
    email:{
        required:true,
        trim:true,
        type:String,
        minlength:1
    },
    age:{
        type:Number,
        required:true,
        trim:true
    }
});

module.exports = {User};