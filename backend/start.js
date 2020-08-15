const express = require('express')
const router = require("./routes/index");
const corsrequest = require('./config/cors');
const session = require("./middleware/session");
const bodyParser = require('body-parser');
// const mongodb = require('./config/mongoConfig');
const app = express()
app.use(express.json());
const mongoose = require('mongoose');
var dotenv = require('dotenv')
// var cors = require('cors')

// app.use(cors())

dotenv.config()
const mongo = mongoose.connect(process.env.DBPATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongodb = mongoose.connection;
mongodb.on("error", () => {
    console.log("> error occurred from the Mongo database");
});
mongodb.once("open", () => {
    console.log("> successfully opened the Mongo database");
})


// if you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

// MONGO CONNECTION
// const mongoose = require('mongoose');
// var dotenv = require('dotenv')

// dotenv.config()

// SETUP CORS LOGIC
// app.options("*", corsrequest);
// app.use(corsrequest)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
// Body parser Logic

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session);
// app.use(mongodb);
app.use(router);

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`app listening on port ${PORT}`))