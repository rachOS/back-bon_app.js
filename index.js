const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 8000  ;
const cors = require('cors');
const routes = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', routes);


app.listen(port, (err) => {
  if(err) {
    console.log(err)
  }
  console.log(`listen on port ${port}`)
})


