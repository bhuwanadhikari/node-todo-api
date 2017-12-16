var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//var mongoose = require('./db/mongoose').mongoose
var {mongoose} = require('./db/mongoose') // identical to the line 1
var {Todo}= require('./models/todo');
var {User} = require('./models/user');

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



//getting the todo by passing id
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


app.listen(port, ()=>{
    console.log(`server is up at port: ${port}`);
});






















//
