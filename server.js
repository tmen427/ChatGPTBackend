
import 'dotenv/config';
import express from "express";
const app = express()
import cors from "cors"; 

import {StoredVector} from './chatgp.js';



app.use(cors())

app.get('/', function (req, res) {
 res.send("hello world")
})
    
app.get('/api/:id', async (req, res) => {
    //res.send(req.params.id)
  try {
      console.log(req.params.id)
      let response = await StoredVector(req.params.id);
      res.send(response.text);
    }
    catch(error) {
      res.send(error.message)
      console.log(error)
    }
  })


  var port = process.env.PORT || 3000;

  app.listen(port, function () {
    console.log('App listening on port ' + port + '!');
  });