const { Router } = require('express')
const Blog = require('../models/blogModel')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().limit(6).lean()
        res.render('index', {
            title: 'Home page',
            isLogged: req.session.isLogged,
            blogs: blogs.reverse()
        })
    } catch(err) {
        console.log(err)
    }
})

router.get('/blogposts', async (req, res) => {
    try{

        const blogs = await Blog.find().lean()

        res.render('allBlogs', {
            title: 'All blogs',
            blogs: blogs.reverse(),
            isLogged: req.session.isLogged,
        })
    } catch(err){
        console.log(err)
    }
})

router.get('/blogpost', async (req, res) => {
    try {
        let slugUrl = req.query.post

        const blog = await Blog.findOne({slugUrl})
        res.render('post', {
            title: blog.title,
            content: blog.content,
            image: blog.image,
            createdAt: blog.createdAt,
            isLogged: req.session.isLogged
        })
    } catch(err) {
        console.log(err)
    }
})

module.exports = router