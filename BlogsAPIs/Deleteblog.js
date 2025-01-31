const { Blog } = require('../models/Blog');
const mongoose = require('mongoose');

const RemoveBlog = async (req, res) => {
    const blog_id = req.params.id;
    console.log(blog_id);

    // Check if the blog ID is provided and is a valid MongoDB ObjectId
    if (!blog_id || !mongoose.Types.ObjectId.isValid(blog_id)) {
        return res.status(400).json({ message: 'Invalid or missing Blog ID' });
    }

    try {
        // Find the blog with respect to the provided ID
        const BlogToRemove = await Blog.findOne({ _id: blog_id });

        // Check if the blog exists
        if (!BlogToRemove) {
            return res.status(404).json({ message: `Blog with ID ${blog_id} not found` });
        }

        // Remove the blog
        await Blog.deleteOne({ _id: blog_id });

        // Send response after successful removal
        return res.status(200).json({ message: `Blog with ID ${blog_id} has been removed` });

    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

module.exports = RemoveBlog;
