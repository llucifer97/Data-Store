
const app = require('../app')
const port = 8730 || process.env.PORT;

app.listen(port, () => {
    console.log(`DS app listening at http://localhost:${port}`)
  })
  
 


