const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
      console.log(err);
      return console.log("Not connected");
  }  
    console.log("Successfully connected");

        db.collection('Todos').findOneAndDelete({completed:true})
            .then((result)=>{
        console.log(JSON.stringify(result, undefined, 3));
    }).catch((error)=>{
        console.log(error);
        console.log("Cannot cannot delete the information");
    })
    
});
