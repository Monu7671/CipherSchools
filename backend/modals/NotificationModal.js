const mongoose = require("mongoose");


const notificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },

    timestamp: {
        type: Date,
        required: true,
        default: new Date()
    },



})

// Method to check the entered password is correct or not 

const Notification = mongoose.model('notifications', notificationSchema)
module.exports = Notification