const { User, validate } = require('../models/user');
const mongoose = require('mongoose');

const getAllUser = async (req, res) => {
    const { id } = req.query;  // Retrieve the 'id' from query parameters
    
    try {
     
        if (id) {
            
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            
            // Find user by ID
            const findSingleUser = await User.findById(id);
            if (!findSingleUser) {
                return res.status(404).json({ message: `User with ID ${id} not found` });
            }

            // Return the found user
            return res.status(200).json(findSingleUser);
        } else {

          
            const users = await User.find(); // Directly awaiting the result


            if (users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }

            // Return the list of users
            return res.status(200).json({users});
        }

    } catch (err) {
        // Log the error for server-side debugging
        console.error('Error fetching users:', err);
        
        // Return a generic server error message
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = getAllUser;
