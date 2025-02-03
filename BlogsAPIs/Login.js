const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Ensure password is not empty
    if (!password || password.trim() === '') {
      return res.status(400).json({ message: 'Password cannot be empty' });
    }

    // Compare entered password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
    // Create and sign JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Send back user data and token
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

module.exports = SignIn;
