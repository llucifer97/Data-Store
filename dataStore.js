var fs = require('fs');


class DS 
{

   
    constructor(path) {
         this.mp = new Map();
        // check if file already exist


        // create te file
        fs.accessSync(path, error => {
            if (error) {
                fs.open(path, 'w', function (err, file) {
					if (err) throw err;
					
					}); 
            } else {
             
            }
        });


    // read the txtx file

    fs.readFileSync(path, 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}
       
		let res = data.split("+");
        
		// parse JSON object
		for(let i = 0;i < res.length-1;i++){
            const user = JSON.parse(res[i].toString());
           // console.log( JSON.parse(user.value.toString()));
            this.mp.set(user.key,user.value);
            console.log(this.mp.size)
           // console.log(this.mp.get(user.key));

		}
		
	});

    
    }
    

     add(key,value) {

    //  if(!this.mp.get(key)) return;

       const data = JSON.stringify(value);
       

        const user = {
            key : key,
            value : data
        };
        console.log("hello")
        console.log(this.mp.size);

        let val = JSON.stringify(user);
       
        val = val + "+";

        fs.appendFileSync('data.txt', val,  (err) => {
            if (err) throw err;
            console.log('Saved!');
        });

    }

    read(key) {

        //iterate the map
         
          // console.log(this.mp.get(key));
    }

    delete(key) {  
		this.mp.delete(key)
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
  obj.add("a2",val2);



  obj.read('ayush');
