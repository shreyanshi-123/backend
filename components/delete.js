const { User } = require('../models/user');
const mongoose = require('mongoose');

const remove = async (req, res) => {
    const userId = req.params.id;

    // Check if the user ID is provided and is a valid MongoDB ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid or missing User ID' });
    }

    try {
        // Find the user to be deleted
        const userToDelete = await User.findById(userId);

        if (!userToDelete) {
            return res.status(404).json({ message: `User with ID ${userId} not found` });
        }

        // Check if the user to delete is an admin
        if (userToDelete.role === 'admin') {
            // Count the number of admins in the system
            const adminsCount = await User.countDocuments({ role: 'admin' });

            // If there's only one admin, prevent the deletion
            if (adminsCount <= 1) {
                return res.status(400).json({ message: 'Cannot delete the last admin. At least one admin must exist.' });
            }
        }

        // Proceed with the deletion of the user
        await User.findByIdAndDelete(userId);

        // Send response after successful removal
        return res.status(204).send(); // 204 No Content is appropriate for a successful deletion

    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

module.exports = remove;
