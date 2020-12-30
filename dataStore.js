var fs = require('fs');


class DS {

   
    constructor(path) {
         this.mp = new Map();
        // check if file already exist


        // create te file
    fs.open(path, 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    }); 
    
    }
    

    add(key,value) {

     

       const data = JSON.stringify(value);
       

        const user = {
            key : key,
            value : data
        };
        
       // console.log(key);
       this.mp.set(key, data); 

        let val = JSON.stringify(user);
       // check if key exist
            // iterate the map
        val = val + "+";
        fs.appendFile('data.txt', val,  (err) => {
            if (err) throw err;
            console.log('Saved!');
        });

    }

    read(key) {

        // load the data file
       // let pt =  this.path;
       console.log(this.mp.get(key));
        fs.readFile('data.txt', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

           
            let res = data.split("+");
        
            // parse JSON object
            for(let i =0;i < res.length-1;i++){
                const user = JSON.parse(res[i].toString());
        
                // print JSON object
                console.log(user);
            }
            
        });

        //iterate the map



        //console log the value

    }

    delete(key) {

    }
  
  }
  
  // Usage:
  let obj = new DS('./data.txt');
  const val = {
      "age" : 23,
      "cgpa" : 9.9
  }
  
  const val2 = {
    "age" : 21,
    "cgpa" : 4.9
}

  obj.add("ayush",val);
  obj.add("pratik",val2);


 obj.read("ayush");
