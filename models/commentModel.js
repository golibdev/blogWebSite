const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
        min: 10
    }
})

module.exports = model('Comment', commentSchema)