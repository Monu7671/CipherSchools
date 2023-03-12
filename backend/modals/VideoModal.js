const mongoose = require("mongoose");


const replySchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
        default: new Date()
    },
})

const commentSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
        default: new Date()
    },

    replies: {
        type: [replySchema],
        required: false
    }
})

const videoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,

    },
    video_url: {
        type: String,
        required: true,
    },
    upload_date: {
        type: Date,
        required: true,
        default: new Date()

    },
    likes: {
        type: Number,
        required: true,
        default: 0

    },
    views: {
        type: Number,
        required: true,
        default: 0

    },
    comments: {
        type: [commentSchema],
        required: false
    }


})

// Method to check the entered password is correct or not 

const Video = mongoose.model('videos', videoSchema)
module.exports = Video