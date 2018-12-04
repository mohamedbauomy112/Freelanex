const config = require('./config')
const web3 = require('./ethconn')

const express = require('express')
const bodyParser = require('body-parser')

//paste here


// ---- Web Server
const app = express()
const port = config.api.port
var cors= require('cors');


app.use(bodyParser.json())

// headers setup

app.use((req,res,next) => {//

  res.header("Access-Control-Allow-Origin","http://localhost:4200");//
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");//
  res.header("Access-Control-Allow-Headers",'Content-type,Accept,X-Access-Token,X-Key');
//"Origin, X-Requested-With, Content-Type, Accept"
  next();

})

// routes
require('./api/routes/index')(app, web3)

// Start the server
app.listen(port, () => {
  console.log('Ethereum Node HTTP RESTful API server started on: ' + port + ' ... \n')
})

