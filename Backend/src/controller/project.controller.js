const projectModel = require('../models/project.model');
const uploadFile = require('../service/project.service.js');

const createProject = async (req, res) => {
    try {
        const { projectName, techStack, liveLink, githubLink, description,  detailDescription } = req.body;
        const file = req.file.buffer;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageResponse = await uploadFile(file);
        const techStackArray = typeof techStack === 'string' ? techStack.split(',').map(item => item.trim()) : techStack;
        const project = await projectModel.create({
            projectImage: imageResponse.url,
            projectName,
            techStack: techStackArray,
            liveLink,
            githubLink,
            description,
            detailDescription
        });

        return res.status(201).json({
            message: "Project created successfully!",
            project
        })

    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}
const getProject = async (req, res) => {
    try{
        const { id } = req.params;
        const project = await projectModel.findById(id);
    console.log(project);

    return res.status(200).json({
        message: "Project fetched successfully!",
        project
    })
    }catch(err){
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Projects fetched successfully!",
            projects: projects
        })
    }
    catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(409).json({
                message: "Object id is not available!"
            })
        }
        const deleteProject = await projectModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Project deleted successfully!",
            deleteProject
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const editProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(409).json({
                message: "Object id is not available!"
            })
        }
        const { projectName, techStack, liveLink, githubLink, description, detailDescription } = req.body;

        const techStackArray = typeof techStack === 'string' ? techStack.split(',').map(item => item.trim()) : techStack;

        const updateData = {
            projectName,
            techStack: techStackArray,
            liveLink,
            githubLink,
            description,
             detailDescription
        }
        if (req.file) {
            updateData.projectImage = req.file.path;
        }
        const edit = await projectModel.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        )

        return res.status(200).json({
            message: "Project edited successfully!",
            project: edit
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }

}
module.exports = { createProject, getAllProjects, deleteProject, editProject, getProject }