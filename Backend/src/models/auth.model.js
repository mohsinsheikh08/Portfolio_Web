const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            requierd: true,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
            requierd: true
        }
    },
    email : {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters long"],
        required: true,
    },

    role: {
        type : String,
        enum : ['User', 'Admin'],
        default : 'User'
    }
},{
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
