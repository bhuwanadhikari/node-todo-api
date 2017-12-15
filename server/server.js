var express = require('express');
var bodyParser = require('body-parser');

//var mongoose = require('./db/mongoose').mongoose
var {mongoose} = require('./db/mongoose') // identical to the line 1
var {Todo}= require('./models/todo');
var {User} = require('./models/user');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
    	res.send("cannot be added to the database",err);
    });
});

app.listen(3000, ()=>{
    console.log("server is up at port:3000");
});