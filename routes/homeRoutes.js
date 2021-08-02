const { Router } = require('express')
const Blog = require('../models/blogModel')
const superagent = require('superagent')
const quoteGenerateRandom = require('../quote/quote')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().limit(6).sort({$natural: -1}).lean()
        res.render('index', {
            title: 'Home page',
            isLogged: req.session.isLogged,
            blogs: blogs
        })
    } catch(err) {
        console.log(err)
    }
})

router.get('/blogs', async (req, res) => {
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

        async function updateVistedCount() {
            let url = `https://api.countapi.xyz/hit/youngproger/${slugUrl}`
            const resp = await superagent.get(url)
            return resp.body.value++
        }

        res.render('post', {
            title: blog.title,
            content: blog.content,
            image: blog.image,
            slugUrl: slugUrl,
            createdAt: blog.createdAt,
            isLogged: req.session.isLogged,
            count: await updateVistedCount(),
            quote: quoteGenerateRandom()
        })
    } catch(err) {
        console.log(err)
    }
})

module.exports = router