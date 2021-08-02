const { Router } = require('express')
const path = require('path')
const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')
const { protected } = require('../middlewares/auth')

const router = Router()

router.get('/add', protected, (req, res) => {
    res.render('addPost/add', {
        title: 'Add Post',
        isLogged: req.session.isLogged
    })
})

router.post('/add', protected, async (req, res) => {
    try {
        let sampleFile
        let uploadPath

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).redirect('/post/add')
        }

        sampleFile = req.files.image
        uploadPath = path.join(__dirname, '..', 'public/uploads/' + sampleFile.name)

        sampleFile.mv(uploadPath, function(err){
            if(err) {
                console.log(err)
            }
        })

        function convertSlugText(text){
            return text.toLowerCase().
            replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
        }

        const blog = new Blog({
            title: req.body.title,
            image: sampleFile.name,
            content: req.body.content,
            slugUrl: convertSlugText(req.body.title)
        })

        await blog.save()
        res.redirect('/')

    } catch (err) {
        console.log(err)
    }
})

router.get('/edit', protected, async (req, res) => {
    try {

        let slugUrl = req.query.post
        const blog = await Blog.findOne({slugUrl})

        res.render('edit/editPost', {
            title: blog.title,
            content: blog.content,
            image: blog.image,
            slugUrl: blog.slugUrl,
            isLogged: req.session.isLogged
        })
    } catch(err) {
        console.log(err)
    }
})

router.post('/delete', protected, async (req, res) => {
    try {
        const blog = await Blog.findOne({slugUrl: req.query.post})

        const deleteBlog = await Blog.findByIdAndDelete(blog._id)

        res.redirect('/blogs')
    } catch(err) {
        console.log(err)
    }
})

router.post('/edit/:slugUrl', protected, async (req, res) => {
    try {
        const editedBlog = await Blog.findOne({slugUrl: req.params.slugUrl})
        const blogs = await Blog.findByIdAndUpdate(editedBlog._id, req.body).lean()
        res.redirect('/blogs')
    } catch(err) {
        console.log(err)
    }
})

module.exports = router