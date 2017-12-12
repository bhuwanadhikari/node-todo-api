const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
      console.log(err);
      return console.log("Not connected");
  }  
    console.log("Successfully connected");
    
    //--Updating the documents-----------------
    
    db.collection('Users').findOneAndUpdate(
        {name:'Bhuwan Adhikari'},
        {
            $set:{name:'Bhuwan', location:'Nepal'},
            $inc:{age:1}
        },
        {returnOriginal:false}
        
    ).then((result)=>{
        console.log("successfully updated", result);
    }) ;
    
});
