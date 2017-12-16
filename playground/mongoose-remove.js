const {ObjectID} = require('mongodb');
const {mongoose}= require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User} = require('./../server/models/user');

//removing the documents
  //removing the all documents matching the properties
Todo.remove({}).then((result)=>{
  console.log(JSON.stringify(result, undefined, 3));
}).catch((e)=>{
  console.log(e);
});

Todo.findOneAndRemove({completed:true}).then((result)=>{
  console.log(JSON.stringify(result, undefined, 3));
}).catch((e)=>{
  console.log("We cannot remove the todos");
});































//
