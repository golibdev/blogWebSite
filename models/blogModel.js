const { Schema, model } = require('mongoose')

let date = new Date()

let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

if(day < 10) {
    day = '0' + day
}

if(month < 10) { 
    month = '0' + month
}

const postSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 15,
        maxLength: 100
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10000
    },
    slugUrl: {
        type: String
    },
    createdAt: {
        type: String,
        default: `${day}.${month+1}.${year}`
    }
})

module.exports = model('Blog', postSchema)