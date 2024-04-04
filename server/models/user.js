const mongoose = require('mongoose');
const fs = require('fs');
//Admin
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

//subadmin
const subadminSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email:{type:String,required:true,unique:true},
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: {type:Number,required:true},
  
});
const SubAdmin = mongoose.model('SubAdmin', subadminSchema);
//user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const User = mongoose.model('User', userSchema);

//Student
const voluntierSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email:{type:String,required:true,unique:true},
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: {type:Number,required:true},
    street: {type:String,required:true},
    gender: {type:String,required:true},
    status: {type:String,required:true}
});

const Voluntier = mongoose.model('Voluntier',  voluntierSchema);

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    location: String,
    description: String,
    startTime: String, 
    endTime: String,
    status: {
      type: String,
      default: 'Not completed',
    },
  });
  
  const Event = mongoose.model('Event', eventSchema);
 
  //////////////////////////////////////////////////////////image schema
  


module.exports = {User,Admin,SubAdmin,Voluntier,Event}
