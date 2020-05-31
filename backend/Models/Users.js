const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema 

const UserDataSchema = new mongoose.Schema({
    Bio:String,
    Profession:String,
})


const UserSchema = new mongoose.Schema({
  firstname: {
      type: String,
      required: true,
      max: 255,
      min: 6
}  ,
  lastname: {
    type: String,
    required: true,
    min: 6
}  ,
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
}  ,
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
}  ,
  phone: {
    type: String,
    required: true,
    min: 6
}  ,
  date: {
    type: Date,
    default: Date.now
}  ,
passwordConfirm: {
    type: String,
    required: true,
    min: 6
},
details:{
    type:ObjectId,
    ref:"UsersData",
    default:null
}
});


const userData = mongoose.model('UsersData', UserDataSchema)

const user = mongoose.model('Users', UserSchema)

// module.exports = mongoose.model('Users', UserSchema);
module.exports = {user,userData};

