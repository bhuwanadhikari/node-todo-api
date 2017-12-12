const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
      console.log(err);
      return console.log("Not connected");
  }  
    console.log("Successfully connected");
    
    //--Fetching the data from the database
/*    db.collection('Todos').find({name:'Bhuwan Adhikari'}).toArray().then((docs)=>{
        console.log(docs[0]);
    }).catch((error)=>{
        console.log(error);
        console.log("Cannot find the information");
    })
    */
    //counting the number of the data matching
        db.collection('Todos').find({completed:false}).count().then((count)=>{
        console.log(count);
    }).catch((error)=>{
        console.log(error);
        console.log("Cannot find the information");
    })
    
});
