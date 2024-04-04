const mongoose=require('mongoose')
const issuSchema = new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    category:String,
    userName:String,
    status:String
}) 
const Issue = mongoose.model("Issue",issuSchema)
module.exports={Issue}