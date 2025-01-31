const { User } = require('../models/user');
const mongoose = require('mongoose');

const remove = async (req, res) => {
    const userId = req.params.id;

    // Check if the user ID is provided and is a valid MongoDB ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid or missing User ID' });
    }

    try {
        // Find and delete the user by ID in one operation
        const deletedUser = await User.findByIdAndDelete(userId);

        // Check if the user exists and was deleted
        if (!deletedUser) {
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }

        // Send response after successful removal
        return res.status(204).send(); // 204 No Content is appropriate for a successful deletion

    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

module.exports = remove;
