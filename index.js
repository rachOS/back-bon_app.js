const express = require('express');
const app = express();
const port = process.env.PORT;
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', routes);

// conditional test for Heroku PORT
if (port == null || port == "") {
    port = 8000;
  }

app.listen(port, (err) => {
  if(err) {
    console.log(err)
  }
  console.log('Super :)')
})


