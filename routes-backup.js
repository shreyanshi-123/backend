const express = require ('express');
const router = express.Router();

// Import the controller functions
const {
  registerUser,
  loginUser,
  getLoggedInUser,
  sendEmailToMultipleRecipients
} = require('../controller/controller');

// Define the routes and their corresponding handler functions
router.post('/register', registerUser); // POST request for registering a user
router.post('/login', loginUser);       // POST request for logging in a user
router.get('/me', getLoggedInUser);     // GET request to retrieve logged-in user's data
router.post('/send-email', sendEmailToMultipleRecipients); 

module.exports = router;
