const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectImage: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true
    },
    liveLink: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    detailDescription: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;