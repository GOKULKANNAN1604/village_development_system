const mongoose=require('mongoose')
const dataSchema = new mongoose.Schema({
    name: String,
    email:String,
    mobileNumber: String,
    rationCardNumber: String,
    aadharCardNumber: String
  });
  
  // Define a mongoose model based on the schema
  const People = mongoose.model('People', dataSchema);
  module.exports={People}