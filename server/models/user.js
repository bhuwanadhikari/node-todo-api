var mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {


    email:{
        required:true,
        trim:true,
        type:String,
        minlength:1,
        unique:true,
        validate:{  //validate takes two key value pairs validator and the message for the error
          validator: validator.isEmail,
          message: "{value} is not a valid Email"
        }
    },

    password:{
      type:String,
      minlength:6,
      required:true,
    },

    token:[{  //syntax for token is object inside the array which mostly has two key value pairs access and token
      access:{
        type:String,
        required:true
      },
      token: {
        type:String,
        required:true
      }

    }],
}

);
module.exports = {User};






























//
