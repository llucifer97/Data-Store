 
 var locks = require('locks');
 var fs = require('fs');
const { DS } = require("./dataStore");
 const obj = new DS('./data.txt')

 let r = obj.read("ayush")
 obj.add("ayush")
let key = "ayushraj"
 const val = {
    "age" : 23,
    "cgpa" : 9.9
}

////////////////////////////////////////////////////////////////////

// test('if key exist ', () => {
//   expect().toBe(val);
// });


test('key is of 32 char max  ', () => {
    expect(obj.keyLength()).toBeLessThan(32);
  });


// test(' value is 16kb max', () => {
//     expect().toBe();
//   });


// test('size of data file is max 1GB  ', () => {
//     expect().toBe();
//   });

