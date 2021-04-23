const {store} = require('./HashMap')

class TTL {

    
        constructor() 
            {
                this.cache = new Map();
                
            }

        pushData(key,time)
            {
                let timestamp = new Date();
                this.cache.set(key,{"time" : time,"timestamp":timestamp})
            }
    
             /*
                based on timestamp every key is evaluated if it is expired ,and gets deleted both from cache and store
                cache stores all the data that is created and also present in db-file,initially

            */
  

        isExpired(key)
            {
                if(this.cache.get(key) === undefined)
                {
                    console.log(`${key}` + " does not exist in cache");
                    
                    return true;
                }
                let timenow = new Date();
                let timestamp = this.cache.get(key).timestamp;
                let timediff = (timenow.getTime() - timestamp.getTime()) / 1000;
                if(timediff > this.cache.get(key).time )
                {
                    console.log(timediff,  "time has passed")
                    // delete from  cache
                    this.cache.delete(key)
                    // delete from mp
                    store.deleteData(key);
                    console.log(`${key} + " has been deleted as key is expired`);
                    
                    return true;
                }
                return false;
            }

            showCachememory()
            {
               
    
                for (let [key, value] of this.cache) { 
                let data = {
                    "key" : key,
                    "value" : value
                }

                console.log(data)
            
                
                }
            
            }
    
  }
  
  const ttl = new TTL()
  Object.freeze(ttl)



module.exports = {
   ttl
};
