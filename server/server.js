const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


//var mongoose = require('./db/mongoose').mongoose
const {mongoose} = require('./db/mongoose') // identical to the line 1
const {Todo}= require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();

//assigning port for heroku
const port = process.env.PORT||3000;


app.use(bodyParser.json());//to coordinate with the requests in json way


//POST request
app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
    	res.status(400).send(e);
    });
});


//GET request
app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});


// getting the todo by passing id
app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;

  //terminating if id is not valid
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    //terminating if id doesn't exist
    if(!todo){
      return res.status(404).send();
    }
    //sending the todo if id is found
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});


//deleting id by id
app.delete('/todos/:id', (req,res)=>{
  id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});


//Updating the Todos
app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text', 'completed']);//loadash is used here

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){ //loadash is used here as utility
    body.completedAt= new Date().getTime();

  }
  else{
    body.completed=false;
    body.completedAt=null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo)=>{
    if(!todo){
      return res.status(400).send();
    }
    res.status(200).send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});


// signup for the users
app.post('/users',(req, res) => {

  //picking the userinfo from the input
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body); // passing body to the constructor function as body is already ready to used


  user.save().then(()=>{ //  like then((user)=>{}) i.e then takes user as arg which is same as above declared
      return user.generateAuthToken();
}).then((token) => {
  res.header('x-auth', token).json(user);
  }).catch((e)=>{
  res.status(400).send(e);
});
});


// Private get request to get data of a user
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


// Dedicated route to login in the user from existing user in the database
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send();
  });

});

app.listen(port, ()=>{
    console.log(`server is up at port: ${port}`);
});








//
