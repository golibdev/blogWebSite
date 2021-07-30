const { Router } = require('express')
const path = require('path')
const Blog = require('../models/blogModel')
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

module.exports = router