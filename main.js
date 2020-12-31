const { DS } = require("./dataStore");

                        
// initialize a object
const obj = new DS('./data.txt');

  const val = {
      "age" : 23,
      "cgpa" : 9.9
  }
  obj.read("ayush")
    //    obj.add("ayush",val);
    //    obj.add("pratik",val);
    //    obj.add("a1",val);
    //    obj.add("a2",val);
    //    obj.add("a3",val);

       // obj.delet("a1")
       obj.read("ayush")
       obj.timeToLive();

       obj.read("ayush")

       

