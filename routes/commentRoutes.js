const { Router } = require('express')
const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')

const router = Router()

router.post('/comment', async (req, res) => {
    try {
        const { email, content } = req.body

        const comments = await Comment.create({
            email: email,
            content: content
        })
                
        comments.save()
        res.redirect('/blogs')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router