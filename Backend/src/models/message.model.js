const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match : [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    subject: {
     type : String,
     required: true,
     trim: true
    },
    message: {
        type: String,
         required: true,
    }
},{
    timestamps: true
})

const messageModel = mongoose.model('Message', messageSchema)

module.exports = messageModel