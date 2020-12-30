var fs = require('fs');


class DS 
{   
    constructor(path) {
         this.mp = new Map();
          this.data = ""
          this.res = ""
          this.path = path
        // check if file already exist

        // Test the if the file exists 
           // console.log('\n> Checking if the file exists'); 
            try { 
            fs.accessSync(path, fs.constants.F_OK); 
           // console.log('File does exist'); 
            } catch (err) { 
           // console.error('File does not exist'); 
            fs.writeFileSync(path, ""); 

            } 
            
          //  console.log('\nCreating the file'); 
            
            // Test the if the file exists again 
          //  console.log('\n> Checking if the file exists'); 
            try { 
            fs.accessSync(path, fs.constants.F_OK); 
          //  console.log('File does exist'); 
            } catch (err) { 
           // console.error('File does not exist'); 
            } 


    // read the txtx file

    this.data =  fs.readFileSync(path, 'utf-8')
		
		 this.res = this.data.split("+");
       // console.log(res);
		// parse JSON object
		for(let i = 0;i < this.res.length-1;i++){
            const user = JSON.parse(this.res[i].toString());
           // console.log( JSON.parse(user.value.toString()));
            this.mp.set(user.key,user.value);
            //console.log(this.mp.size)
           // console.log(this.mp.get(user.key));

		}
    
    }
    

     add(key,value) {

      if(this.mp.get(key) != undefined) return;

       const data = JSON.stringify(value);
       

        const user = {
            key : key,
            value : data
        };
       
        

        let val = JSON.stringify(user);
       
        val = val + "+";

        fs.appendFileSync('data.txt', val);

    }

    read(key) {

        //iterate the map
         if(this.mp.get(key) != undefined)
         {
            console.log(this.mp.get(key));
         }else{
            console.log(`${key}` + " does not exist");
         }
           
    }

    delete(key) {  
        // console.log(this.data)
        // console.log(this.res)  // array
        fs.writeFileSync(this.path, ""); 
        for(let i = 0;i < this.res.length-1;i++){
            const user = JSON.parse(this.res[i].toString());
            // console.log( JSON.parse(user.value.toString()));
            //this.mp.set(user.key,user.value);
            if(user.key == key) continue;
            let val = JSON.stringify(user);
       
            val = val + "+";

            fs.appendFileSync('data.txt', val);

           // console.log(this.mp.get(user.key));

		}
       

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

//    obj.add("ayush",val);
//    obj.add("pratik",val2);
//   obj.add("a2",val2);



   //  obj.read('ayush');
   //  obj.delete('ayush');
    obj.read('ayush');
