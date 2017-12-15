var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//var mongoose = require('./db/mongoose').mongoose
var {mongoose} = require('./db/mongoose') // identical to the line 1
var {Todo}= require('./models/todo');
var {User} = require('./models/user');


var app = express();
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



//Passing into the params
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


app.listen(3000, ()=>{
    console.log("server is up at port:3000");
});










//
