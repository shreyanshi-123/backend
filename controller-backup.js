const User = require ('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password,
    });

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Generate JWT token (you can replace 'SECRET_KEY' with your own secret key)
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    // Send response with token and user info
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    // Send response with token and user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get logged-in user
const getLoggedInUser = async (req, res) => {
  try {
    // Use the user ID from the decoded JWT token (set by middleware)
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return user details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  auth: {
      user: 'project.1',
      pass: 'secret.1'
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
    from: 'maddison53@ethereal.email', 
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




module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser,
  sendEmailToMultipleRecipients
};
// "subject": "Test Email",
//   "body": "Hello, this is a test email sent to multiple recipients.",
//   "recipients": [
//     "shreyanshisri123@gmail.com"
   
//   ]