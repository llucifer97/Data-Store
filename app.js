
const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const {isJson,keyLength,jsonSize,initialize,createDB} = require('./src/controller/controllers')
const {store} = require('./src/Model/HashMap')
const {ttl} = require('./src/Model/TimeToLive');
const app = express();


// BASIC SETUP
//onst port = 8000 || process.env.PORT 
let env = process.argv[3] || 'dev';
let path = "../db.txt"; 

switch (env) 
{
    case 'dev':
      path = process.argv.length >= 3 ?  process.argv[2].toString() : "../db.txt" 
        break;
    case 'test':
        path = "../db.test.txt"
        break;
}

createDB(path,"");
initialize(path);


//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodiess
  extended: false
}));




app.get('/', (req, res) => {
  
  return res.status(200).json({
    "message" : 'WELCOME TO DATA-STORE!'
})

})

 app.post('/add', (req,res) => {
    let key = req.body.key;
    let interval = req.body.interval;
    let value = req.body.value;
  
    if( !isJson(value))   return res.status(400).json({
      error : "Invalid format!! Only JSON object is accepted"
    });
        
    if(!keyLength(key))  return res.status(400).json({
      error : "Insert key of maximum 32 character!"
    });  
  
    if(!jsonSize(value) )  return res.status(400).json({
      error : "Object can be of maximum 16KB"
    });  
      
    if(store.getData(key) != undefined) return res.status(400).json({
      error : `${key}   already exist`
    });  
  
    
    fs.appendFileSync(path, JSON.stringify(req.body) + "+");

    store.pushData(key, value)
    ttl.pushData(key,interval);

    res.status(200).json({
      "message" : "key-value is added successfully!",
      "response" : req.body
    })

   
})


app.get('/read', (req,res) => {
  const key = req.query.key;
 
  if(ttl.isExpired(key))
  {
    return res.status(403).json({
      "message" : `${key}  is expired and cannot be accesed!`
    })
  }
  else
  {
    
    return res.status(200).json({
      "response" : store.getData(key)
    })
  }

 
})



app.delete('/delete',(req,res) => {
  const key = req.query.key;
  
  // check if ttl has expired
  if(ttl.isExpired(key)){
    
    return res.status(403).json({
      "message" : `${key}  is expired and cannot be accesed!`
    })
  }
  
  if(store.getData(key) != undefined)
  {
    res.status(200).json({
      "response" : store.getData(key)
    })

    store.deleteData(key);
  }
  
  
  const filetowrite = store.getAllData();
  fs.writeFileSync(path, filetowrite); 

  
})


module.exports = app