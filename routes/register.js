const express = require('express');

const router = express.Router();

const defaultController = require('../components/component');
const getAllUser = require('../components/getUser');
const getSingleUser = require('../components/getSingleUser');
const update = require('../components/update');
const remove = require('../components/delete');
const sendEmailToMultipleRecipients = require('../components/sendMultipleEmail')

const AddBlogs = require('../BlogsAPIs/CreateBlogs');
const GetBlog = require('../BlogsAPIs/getBlogs');
const UpdateBlog = require('../BlogsAPIs/Updateblogs');
const RemoveBlog = require('../BlogsAPIs/Deleteblog');
const Signin = require('../BlogsAPIs/Login'); 


// routes for User(CRUD &  Email)
router.post('/create', defaultController)
router.get('/getAll', getAllUser);
router.get('/single/:id', getSingleUser);
router.put('/update/:id', update);
router.delete('/delete/:id', remove);
router.post('/send-email', sendEmailToMultipleRecipients)


// routes for Blog 
router.post('/AddBlogs', AddBlogs)
router.get('/getBlogs', GetBlog);
router.put('/updateBlog/:id', UpdateBlog);
router.delete('/deleteBlog/:id', RemoveBlog);

router.post('/LogIn', Signin)

module.exports = router;


