const mongoose = require('mongoose');
const validator = require('validator'); // used to valid the models
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


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
};



// assigning a method to generate auth token using simple function to use this keyword
UserSchema.methods.generateAuthToken = function(){
    var user = this;  // this is individual user so has small 'u'
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); // getting back the string token

    user.tokens.push({access, token}); // pushing that token to the user model
    //-------------------------------cannot understand just remember----------
    return user.save().then(() => {
        return token;
    });
    // -------------------------------------------------------------------
};



// find the user from the collection by token
// this can be done by setting user defined function in the statics objects of the UserSchema model
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token, 'abc123');
  }catch(e) {
      return Promise.reject();

  }
  return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth',

  });
};



// hashing the password
UserSchema.pre('save', function(next) { // .pre lets to fire a function to the User doc before the event 'save' happens and  function shold have next as arg
    // next arg is because in middleware it should has it as a parameter
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => { // 10 is no of rounds in generating the salt
            bcrypt.hash(user.password, salt, (err, hash) =>{ // error in callback is passed at the first
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});


// modelling from the UserSchema as User as the name of model
var User = mongoose.model('User' , UserSchema, ); //Remember we also specified dbname in angular project and here is not
module.exports = {User};








//
