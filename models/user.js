const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    },
    mobile: {
        type: Number,
        required: true,
        index: {
            unique: true
        },
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: String
    },
    token: {
        type: String,
    }
});

const usermodel = new mongoose.model('user', userSchema);

module.exports = usermodel;