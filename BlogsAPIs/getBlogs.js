const { Blog } = require('../models/Blog');
const mongoose = require('mongoose');

const GetBlog = async (req, res) => {
    const { id } = req.query;
    const UserId = id;

    try {
        if (UserId) {
            if (!mongoose.Types.ObjectId.isValid(UserId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const findBlog = await Blog.aggregate([
                {
                    $match: { user_id: mongoose.Types.ObjectId(UserId) } 
                },
                {
                    $lookup: {
                        from: 'users',  
                        localField: 'user_id',  
                        foreignField: '_id',  
                        as: 'author'  
                        
                    }
                },
                {
                    $unwind: { path: '$author', preserveNullAndEmptyArrays: true }  
                },
                // {
                //     $project: {
                //         _id: 1,
                //         title: 1,
                //         content: 1,
                //         tags: 1,
                //         excerpt: 1,
                //         writter: { $ifNull: [{ $arrayElemAt: ['$author.username', 0] }, 'Unknown Author'] },  
                //         createdAt: 1,  
                //         updatedAt: 1   
                //     }
                // }
            ]);

            console.log('findBlog:', findBlog);  

            if (findBlog.length === 0) {
                return res.status(404).json({ message: `No blogs found for user with ID ${UserId}` });
            }

            return res.status(200).json(findBlog[0]); 
        } else {
            
            const blogs = await Blog.aggregate([
                { "$lookup": {
                    "let": { "userObjId": { "$toObjectId": "$user_id" } },
                    "from": "users",
                    "pipeline": [
                      { "$match": { "$expr": { "$eq": [ "$_id", "$$userObjId" ] } } }
                    ],
                    "as": "userDetails"
                  }},
                {
                    $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true }  
                },
                // console.log(author)
                // {
                //     $project: {
                //         title: 1,
                //         content: 1,
                //         tags: 1,
                //         excerpt: 1,
                //         user_id: 1,
                //         writter:{ $ifNull: [{ $arrayElemAt: ['$userDetails.name', 0] }, 'Unknown Author'] } ,  
                //         date: 1
                        
                //     }
                // }
            ]);

            // console.log('blogs:', blogs);  

            if (blogs.length === 0) {
                return res.status(404).json({ message: 'No blogs found in the database' });
            }

            return res.status(200).json(blogs); 
        }
    } catch (err) {
        console.error('Error fetching blogs:', err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = GetBlog;
