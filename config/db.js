const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI
        const conn = await mongoose.connect(uri, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Mongo db connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB