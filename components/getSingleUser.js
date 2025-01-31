const { User, validate } = require('../models/user');

const getSingleUser = async (req, res) => {
    try {
        // Check if ID is provided in the request parameters
        if (!req.params.id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find user by ID
        const findSingleUser = await User.findById(req.params.id);

        // Check if user exists
        if (!findSingleUser) {
            return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
        }

        // Return the found user
        res.json(findSingleUser);
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = getSingleUser;
