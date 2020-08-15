// MONGO CONNECTION
const mongoose = require('mongoose');
var dotenv = require('dotenv')

dotenv.config()
const mongo = mongoose.connect(process.env.DBPATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const mongodb = mongoose.connection;
// mongodb.on("error", () => {
//     console.log("> error occurred from the Mongo database");
// });
// mongodb.once("open", () => {
//     console.log("> successfully opened the Mongo database");
// })

module.exports = mongo;