
const { isArray } = require('util');
const fs = require('fs');
const {store} = require('../Model/HashMap')
const {ttl} = require('../Model/TimeToLive')



const isJson = (value) => {
    if( value == null || isArray(value) === true || value === undefined)
        {
          console.log("Invalid format!! Only JSON object is accepted");
          return false;
        }

      return true;
}

const  fileSizeInMegabytes = (filename) => {
  const stats = fs.statSync(filename);
  const fileSizeInMB = stats.size / 1000000.0;;
  return fileSizeInMB;
}


const keyLength = (key) => {
  if(key.length > 32)
    {
      console.log("Insert key of maximum 32 character!")
      return false;
    }
    return true;
}

const jsonSize = (value) => {
    const size = Buffer.byteLength(JSON.stringify(value))
    if(size > 16000){
        console.log("Object can be of maximum 16KB")
        return false;
    }
    return true;
}

const initialize = (path) =>
{
      // check size of file if it is > 1GB
      if(fileSizeInMegabytes(path) > 1024) return;
      
      const data =  fs.readFileSync(path, 'utf-8')
      if(data == "")return;
      const res = data.split("+");
            for(let i = 0;i < res.length-1;i++)
            {
                const user = JSON.parse(res[i].toString());
                store.pushData(user.key,user.value);
                ttl.pushData(user.key,5000)
                   
            }

}



const createDB = (path,data) => {
  fs.writeFile(path, data, { flag: 'wx' }, function (err) {
    if (err){
      console.log(err.message)
      return;
    }
    console.log("DB created!");
  });
}

module.exports = {
    jsonSize,
    keyLength,
    isJson,
    initialize,
    createDB
};