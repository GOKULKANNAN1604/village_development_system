const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose =require('mongoose')
const {User,Admin,SubAdmin, Voluntier} = require('../models/user');



//Admin Login

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username });

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const comparedPassword = await bcrypt.compare(password, user.password);

        if (!comparedPassword) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        if(user && comparedPassword){
        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ token, user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Fetch Admin using JWT
exports.fetchAdmin = async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({ error: 'JWT must be provided' });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Admin.findOne({ username: verifyToken.username });

        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }

        return res.status(200).json({ message: 'User fetch successful', user });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid JWT' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

//SubAdmin Register

exports.registerSubAdmin = async(req,res)=>{ 
    try{
        const {name,email,password,role,phone} =req.body;
        const exist = await SubAdmin.findOne({email});
        if (exist) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
          const newSubAdmin = new SubAdmin({name,email,password:hashedPassword,role,phone}); 
        await newSubAdmin.save();
        res.status(201).json({ message: 'subadmin registered successfully' });
    }catch(error){
        console.log(' register error',error);
        res.status(500).json({message:'Internal Server Error'});
    }
}

//subadmin Login

exports.subadminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const email = username
        const user = await SubAdmin.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const comparedPassword = await bcrypt.compare(password, user.password);

        if (!comparedPassword) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        if(user && comparedPassword){
        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ token, user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Fetch subadmin using JWT

exports.fetchSubAdmin = async(req,res)=>{
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ error: 'JWT must be provided' });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await SubAdmin.findOne({ email: verifyToken.username });
        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }

        return res.status(200).json({ message: 'User fetch successful', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.registerSubAdmin = async(req,res)=>{ 
    try{
        const {name,email,password,role,phone} =req.body;
        const exist = await SubAdmin.findOne({email});
        if (exist) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
          const newSubAdmin = new SubAdmin({name,email,password:hashedPassword,role,phone}); 
        await newSubAdmin.save();
        res.status(201).json({ message: 'subadmin registered successfully',newSubAdmin });

    }catch(error){
        console.log('subadmin register error',error);
        res.status(500).json({message:'Internal Server Error'});
    }
}
exports.getAllsubadmin = async (req, res) => {
    try {
        const subadmins = await SubAdmin.find();
        res.status(200).json({ subadmins });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//voluntier Register

exports.registerVoluntier = async (req, res) => {
  try {
    const { regno, name, email, password, role, street, gender, phone } = req.body;
    const exist = await Voluntier.findOne({ email });
    if (exist) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Voluntier({
      regno,
      name,
      email,
      password: hashedPassword,
      role,
      street,
      gender,
      phone,
      status: 'Not Verified' // Set default status here
    });
    await user.save();
    res.status(201).json({ message: 'Volunteer registered successfully', user });
  } catch (error) {
    console.log('register error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//voluntier Login

exports.VoluntierLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Voluntier.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const comparedPassword = await bcrypt.compare(password, user.password);

        if (!comparedPassword) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        if(user && comparedPassword){
        const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ token, user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Fetch  Voluntier using JWT

exports.fetchVoluntier = async(req,res)=>{
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ error: 'JWT must be provided' });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Voluntier.findOne({ email: verifyToken.email });
        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }

        return res.status(200).json({ message: 'User fetch successful', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Update Volunteer Status
exports.updateVolunteerStatus = async (req, res) => {
    try {
      const { volunteerId } = req.params;
      const { status } = req.body;
  
      // Check if the volunteer exists
      const volunteer = await Voluntier.findById(volunteerId);
      if (!volunteer) {
        return res.status(404).json({ error: 'Volunteer not found' });
      }
  
      // Update the status
      volunteer.status = status;
      await volunteer.save();
  
      res.status(200).json({ message: 'Volunteer status updated successfully' });
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.getAllVoluntiers = async (req, res) => {
    try {
        const volunteers = await Voluntier.find();
        res.status(200).json({ volunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



