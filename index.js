const express = require("express");
const cookie = require("cookie-parser");
const app = express();
let port = process.env.PORT;
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/router");

const local = `http://localhost:${port}`;
const remote = "https://front-bonapp.herokuapp.com";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(
  cors({
    credentials: true,
    origin: local,
  })
);

app.use("/api", routes);

// conditional test for Heroku PORT
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`app listen on port ${port}`);
});
