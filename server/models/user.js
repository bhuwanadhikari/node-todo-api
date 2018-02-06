const mongoose = require('mongoose');
const validator = require('validator'); // used to valid the models
const jwt = require('jsonwebtoken');
const _ = require('lodash');


// Setting up the Schema which is just as the model 'User' which accepts a object
var UserSchema = new mongoose.Schema({
    email: {
        required:true,
        trim: true,
        type: String,
        minlength: 1,
        unique: true,
        validate: {  //validate takes two key value pairs validator and the message for the error
          validator: validator.isEmail,
          message: "{value} is not a valid Email"
        }
    },

    password:{
      type:String,
      minlength: 6,
      required: true,
    },

    tokens:[{  //syntax for token is object inside the array which mostly has two key value pairs access and token
      access: {
        type:String,
        required:true
      },
      token: {
        type:String,
        required:true
      }
    }]
 } // end of object inside schema
); // end of UserSchema call

//taking only the email and password to send to the client
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['email', 'password']);
}

// assigning a method to generate auth token using simple function to use this keyword
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); // getting back the string token

    user.tokens.push({access, token}); // pushing that token to the user model
    //-------------------------------cannot understand just remember----------
    return user.save().then(() => {
        return token;
    });
    // -------------------------------------------------------------------
};

// modelling from the UserSchema as User as the name of model
var User = mongoose.model('User' , UserSchema, ); //Remember we also specified dbname in angular project and here is not
module.exports = {User};








//
