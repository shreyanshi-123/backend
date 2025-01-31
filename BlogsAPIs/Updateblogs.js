const { Blog } = require('../models/Blog');

const UpdateBlog = async (req, res) => {
    const BlogsId = req.params.id;
    console.log("Blog ID from query:", BlogsId);

    // Check if the user ID exists in the request parameters
    if (!BlogsId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Find blog by user_id
        const blog = await Blog.findOne({ _id: BlogsId });

        if (!blog) {
            console.log("Blog not found");
            return res.status(404).json({ message: `Blog with User ID ${BlogsId} not found` });
        }

        console.log("Found Blog:", blog);

        // Log incoming request body to see if data is being passed correctly
        console.log("Request Body:", req.body);

        // Check if the request body is an array and access the first element
        const body = Array.isArray(req.body) ? req.body[0] : req.body;

        let updated = false;
        if (body.user_name && body.user_name !== blog.user_name) {
            console.log("Username can't get updated");
            updated = false;
            if(body.user_name !== blog.user_name){
                response.redirect('/');
            }
        
        if (!DisabledEdit) return;
        }else {
        // console.log(body.title);
        // Update fields if the request body contains those fields
        if (body.title && body.title !== blog.title) {
            blog.title = body.title;
            console.log("Updated title:", blog.title);
            updated = true;
        }
        

        if (body.content && body.content !== blog.content) {
            blog.content = body.content;
            console.log("Updated content:", blog.content);
            updated = true;
        }

        if (body.excerpt && body.excerpt !== blog.excerpt) {
            blog.excerpt = body.excerpt;
            console.log("Updated excerpt:", blog.excerpt);
            updated = true;
        }

        if (body.tags && JSON.stringify(body.tags) !== JSON.stringify(blog.tags)) {
            blog.tags = body.tags;
            console.log("Updated tags:", blog.tags);
            updated = true;
        }
       
        console.log(updated);  
        // If no fields were updated, send a response indicating no changes
        if (!updated) {
            return res.status(400).json({ message: 'No changes made to the blog.' });
        }}
console.log('body is',body);
console.log('blog is', blog);
        // Save the updated blog to the database
        const updatedBlog = await blog.save();

        console.log("Updated Blog:", updatedBlog);

        // Return the updated blog as a response
        res.status(200).json(updatedBlog);

    } catch (err) {
        // Log the error for debugging
        console.error(err);

        // Return a 500 Internal Server Error if an unexpected error occurs
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = UpdateBlog;
