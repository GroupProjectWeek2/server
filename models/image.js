
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    title: {
        type: String,
        required: [true, `title is required`]
    },
    url: {
        type: String,
        required: [true, `there's no image url`]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Image', imageSchema)