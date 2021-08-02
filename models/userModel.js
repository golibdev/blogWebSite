const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
}, {
    timestamps: true
}) 

module.exports = model('User', userSchema)