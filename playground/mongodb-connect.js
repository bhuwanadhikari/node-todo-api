// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this method enables to destructure the object. this is identical to line 1.

const obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
	if(err){
        console.log(err);
		return console.log("Not connected to the Mongo Server");
	}
    console.log("Successfully connected to the database");
    
    //--Inserting the data into the Todos collections---------------
 /*   db.collection('Todos').insertOne({
    	todo:"Studying Node js",
    	completed:false
        
    }, (error, result)=>{
    	if(error){
    		return console.log("Unable to insert to the database");
    	}
    	console.log("Successfully inserted into the database");
        
    	console.log(JSON.stringify(result.ops, undefined, 3));
        console.log(result.ops[0]._id.getTimestamp()) ;*/
    
    
    //--Inserting the data into the Todos collections-------------
        
 db.collection('Users').insertOne({
    	name:"Bhuwan Adhikari",
    	age:20
        
    }).then((result)=>{
    	console.log("Successfully inserted into the database");
    	console.log(JSON.stringify(result.ops, undefined, 3));
        console.log(result.ops[0]._id.getTimestamp()) ;
    }).catch((error)=>{
        console.log("Unable to insert to the database");
});

    db.close();
});