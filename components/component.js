const { User, validate } = require('../models/user');  // Import User model and validation function
const bcrypt = require('bcrypt');  // For password hashing
const express = require('express');
const router = express.Router();  // Instantiate Express router


// Register route
const allUser = async (req, res) => {
   
    // Validate the user input
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);  // Return validation error and stop execution
    }

    try {

      
        // Check if the user already exists by email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send('User already exists. Please sign in.');  // Return if user exists and stop execution
        }

        // // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // insert array to mongodb
        const checkbox = req.body.car ;
      
        console.log(checkbox);
      
        // Create a new user
    const  alluser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,  // Store the hashed password
            date: Date(),
            car: checkbox
        });

        // Save the user to the database
        const users = await alluser.save();
        console.log(users);
        // Respond with the newly created user (excluding password)
        return res.status(201).send({
            users

        });

    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        return res.status(500).json({ message: 'Server error, please try again later'});  // Only one response here
    }
};

module.exports = allUser;


