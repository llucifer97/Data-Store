var fs = require('fs');
const { type } = require('os');
const { isArray } = require('util');


class DS 
{   
    constructor(path) {
          this.mp = new Map();
          this.data = ""
          this.res = ""
          this.path = path
          DS.arr = []
         
            try { 
            fs.accessSync(path, fs.constants.F_OK); 
           
            } catch (err) { 
            fs.writeFileSync(path, ""); 
            } 

            try { 
            fs.accessSync(path, fs.constants.F_OK); 
         
            } catch (err) { 
           
            } 


            // read the txtx file
            this.data =  fs.readFileSync(path, 'utf-8')
            this.res = this.data.split("+");
            for(let i = 0;i < this.res.length-1;i++){
                    const user = JSON.parse(this.res[i].toString());
                    this.mp.set(user.key,user.value);
            }
    }

      readallKey(){
              for (let key of this.mp.keys()) {
                DS.arr.push(key)
              }
      }

     add(key,value)
      {

              if( value == null && !isArray(key)){
                  console.log("Invalid format!! Only JSON object is accepted");
                  return;
              }

              if(key.length > 32){
                  console.log("Insert key of maximum 32 character!")
                  return;
              }

              const size = Buffer.byteLength(JSON.stringify(value))
              if(size > 16000){
                  console.log("Object can be of maximum 16KB")
                  return;
              }

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

    read(key)
     {
              if(this.mp.get(key) != undefined)
              {
                  return this.mp.get(key)
              }else{
                  console.log(`${key}` + " does not exist");
                  
              }
            
    }

    delet(key) 
     {  
            fs.writeFileSync(this.path, ""); 
            for(let i = 0;i < this.res.length-1;i++){
                const user = JSON.parse(this.res[i].toString());
                if(user.key == key) continue;
                let val = JSON.stringify(user);
                val = val + "+";
                fs.appendFileSync('data.txt', val);
            }
    
              this.mp.delete(key)
    
     }

    

        TTL()
        {
            function myFunction() {
                console.log(DS.arr[0] + " is already excited!")
                DS.arr.shift()
                if(DS.arr.length == 0){
                    go();
                }
            }
            const myInterval = setInterval(myFunction, 1000);

            function go()
              {
              clearInterval(myInterval);
              }
        }
    
}
  
  // Usage:
  let obj = new DS('./data.txt');
  obj.arr = []
  const val = {
      "age" : 23,
      "cgpa" : 9.9
  }
  
  const val2 = {
    "age" : 21,
    "cgpa" : 4.9
  }
  
      obj.readallKey();

     obj.add("ayush",val);
     obj.add("pratik",val2);
     obj.add("a2",val2);
     obj.TTL();
  
