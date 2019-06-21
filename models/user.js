const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);