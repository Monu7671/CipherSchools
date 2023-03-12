const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
   


})

// Method to check the entered password is correct or not 

const User = mongoose.model('users', userSchema)
module.exports = User