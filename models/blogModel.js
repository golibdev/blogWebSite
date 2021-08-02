const { Schema, model } = require('mongoose')

let date = new Date()

let day = date.getDate()
let month = date.getMonth()+1
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
        min: 15,
        max: 100
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        min: 10,
        max: 10000
    },
    slugUrl: {
        type: String,
        unique: true
    },
    createdAt: {
        type: String,
        default: `${day}.${month}.${year}`
    }
})

module.exports = model('Blog', postSchema)