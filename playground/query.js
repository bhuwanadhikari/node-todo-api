const {ObjectID} = require('mongodb');
const {mongoose}= require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a3159d9d0b2a05c16f25b0f';
var userId = '5a300689e74f8c30013e9d19';
//
// if(!ObjectID.isValid(id)||!ObjectID.isValid(userId)){
//   console.log("ID is not valid");
// }


// Todo.find({  //Todo is the name of the collections
//   _id:id
// }).then((todos)=>{
//   console.log(`Todos from find:${todos}`);
// }).catch((e)=>{
//   console.log(`Error has occured ${e}`);
// });
//
// Todo.findOne({  //Todo is the name of the collections
//   _id:id
// }).then((todos)=>{
//   console.log(`Todos form find one:${todos}`);
// }).catch((e)=>{
//   console.log(`Error has occured ${e}`);
// });
//
// Todo.findById(id).then((todos)=>{
//   console.log(`Todos by id:${todos}`);
// }).catch(()=>{});//This is done just to provent to show "Undhandeled Promise"

User.findById(userId).then((user)=>{
  if(!user){
    return console.log("User not found");
  }
  console.log(`The user is:\n ${user}`);
}).catch((e)=>{
  console.log(e);
});






























//
