const mongoose = require('mongoose')
const Joi = require('joi')

const BlogSchema = new mongoose.Schema({
   title : {
        type: String,
        required: true,
       
    },
    excerpt: {
        type: String,
        required: true,
       
        
    },
    // thumbnail: {
    //     type: String,
    //     required: true,
       

    // },
    user_id: {
        type: String,
        required: true,
       
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }

})

function validateBlog(Blog) {
    const schema = Joi.object({
        title: Joi.string().required(),
        excerpt: Joi.string().required(),
        // thumbnail: Joi.string().min(8).max(100).required(),
        content: Joi.string().required(),
        date: Joi.date().optional(),
        user_id: Joi.string(),
        tags: Joi.array().items(Joi.string()).required(),
      
    })
    return schema.validate(Blog)
}
const Blog = mongoose.model('Blog', BlogSchema)
module.exports.validate = validateBlog
module.exports.Blog = Blog