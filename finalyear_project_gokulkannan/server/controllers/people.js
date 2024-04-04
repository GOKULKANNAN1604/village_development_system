const { People } = require('../models/people');
const nodemailer = require('nodemailer');

exports.addPeople = async (req, res) => {
  try {
    const newPerson = new People({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      rationCardNumber: req.body.rationCardNumber,
      aadharCardNumber: req.body.aadharCardNumber
    });

    // Save the new person to the database
    await newPerson.save();

    // Send email to the provided email address
    await sendEmail(req.body.email);

    res.status(201).json({ message: 'Person added successfully' });
  } catch (error) {
    console.error('Error adding person:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to send an email
const sendEmail = async (emailAddress) => {
  try {
    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com', // Your email address
        pass: 'your-email-password' // Your email password
      }
    });

    // Define email options
    const mailOptions = {
      from: 'your-email@example.com', // Sender address
      to: emailAddress, // Recipient
      subject: 'Account Created', // Subject line
      text: 'Your account has been successfully created.' // Plain text body
      // You can also include HTML content: html: '<h1>Hello</h1>'
    };
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

