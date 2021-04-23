const request = require('supertest')
const app = require('../app')
const fs = require('fs');
const {keyLength,jsonSize} = require('../src/controller/controllers')


const userOne = {
    "key" : "atul",
    "interval":"10",
    "value" : {
                "marks" : 70,
                "sem" : "fail",
                "phone" : "776576575"
              }

}



beforeEach( () => {
    fs.writeFileSync("../db.txt", "");
 })


test('Should add a new key-value in datastore', async () => {
    
    await request(app).post('/add').send(userOne).expect(200)
})


test('basic root route test', async () => {
    await request(app).get('/').send().expect(200)
})


test('read data based on query string', async () => {
    await request(app).get('/read?key=atul').send().expect(200)
})


test('delete data based on query string', async () => {
    await request(app).delete('/delete?key=atul').send().expect(200)
})


test('data is not accessible for deletion', async () => {
    await request(app).delete('/delete?key=abhi').send().expect(403)
})


test('data is not accessible for read', async () => {
    await request(app).delete('/delete?key=abhi').send().expect(403)
})


test('key length is correct', () => {
    const val = keyLength("#################")
    expect(val).toBe(true)
})



test('key length is more than required', () => {
    const val = keyLength("##########################################################################3###########")
    expect(val).toBe(false)
})


test('jsonSize is correct', () => {
    const val = jsonSize(userOne)
    expect(val).toBe(true)
})