const  {User}  = require('../models/user');

const UpdateBlog = async (req, res) => {
    // console.log(User)
    try {
        const userId = req.params.id;  // Extract user ID from the URL params
        const { name, email, car, password } = req.body;  // Extract updated user data from request body

        // Validate input
        if (!name || !email || !car || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find the user and update it
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, car, password },
            { new: true }  // Ensures the updated user is returned, not the original one
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the updated user (including _id)
        res.json(updatedUser);

    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = UpdateBlog;
