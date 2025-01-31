const { Blog } = require('../models/Blog');
const express = require('express');
const router = express.Router();
console.log('entered-createblogs');

// Register route to create a new blog
const AddBlogs = async (req, res) => {
    const { user_id, title, excerpt, content, tags } = req.body;  // Destructure fields from body
    console.log(user_id, 'user_id');

    // Validate that all required fields are present
    if (!user_id || !title || !excerpt || !content || !tags) {
        return res.status(400).json({ message: 'All fields are required (user_id, title, excerpt, content, tags)' });
    }

    try {
        // Ensure tags are in array format (if received as a string)
        let tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

        // Create a new blog post
        const newBlog = new Blog({
            title,
            excerpt,
            date: Date.now(), // Let Mongoose handle the default date
            user_id,  // Use the user_id from the body
            content,
            tags: tagsArray,
        });

        // Save the blog to the database
        const blog = await newBlog.save();
        console.log(blog);
        
        // Respond with the newly created blog
        return res.status(201).json({ blog });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
};

module.exports = AddBlogs;
