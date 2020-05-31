const express = require('express')
const router = require("./routes/index");
const corsrequest = require('./config/cors');
const session = require("./middleware/session");
const bodyParser = require('body-parser');

const app = express()
app.use(express.json());

// if you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

// MONGO CONNECTION
const mongoose = require('mongoose');
var dotenv = require('dotenv')

dotenv.config()
mongoose.connect(process.env.DBPATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the Mongo database");
});
db.once("open", () => {
    console.log("> successfully opened the Mongo database");
})

// SETUP CORS LOGIC
app.options("*", corsrequest);
app.use(corsrequest)

// Body parser Logic

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session);
app.use(router);

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`app listening on port ${PORT}`))