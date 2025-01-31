const User = require ('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For generating JWT tokens


const nodemailer = require('nodemailer');
console.log('111');
// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'louisa.cole52@ethereal.email',
      pass: 'bSKAeHTV8F4fnnT1yr'
  }
});

// Send email to multiple recipients
const sendEmailToMultipleRecipients = async (req, res) => {
  const { subject, body, recipients } = req.body; 

  if (!recipients || recipients.length === 0) {
    return res.status(400).json({ message: 'No recipients provided' });
  }

  // Create the email options
  const mailOptions = {
    from: 'louisa.cole52@ethereal.email', 
    to: recipients.join(','),     
    subject: subject,             
    text: body,                   
    // html: body,                  
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
};




module.exports = sendEmailToMultipleRecipients

// "subject": "Test Email",
//   "body": "Hello, this is a test email sent to multiple recipients.",
//   "recipients": [
//     "shreyanshisri123@gmail.com"
   
//   ]