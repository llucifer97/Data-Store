 
 let locks = require('locks');
 let fs = require('fs');
const { DS } = require("./dataStore");

                        
// initialize a object
const obj = new DS('./data.txt');

  const val = {
      "age" : 23,
      "cgpa" : 9.9
  }

  obj.add("ayush",val);
            obj.add("raj",val);
            obj.add("a3",val);
       var mutex = locks.createMutex();
       
       mutex.lock(function () {
         
         
           // obj.delet("a3")
         mutex.unlock();
       })
       
       if (mutex.isLocked) {
         console.log('Something has the lock.');
       }
       
       
       
       




