const express = require('express')

const router = express.Router();

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const projectController = require('../controller/project.controller.js');
const tokenChecker = require('../middleware/tokenchecker.middleware.js');

router.post('/create-project', tokenChecker, upload.single('projectImage'), projectController.createProject)

router.get('/all-projects', projectController.getAllProjects)

router.delete('/:id', tokenChecker, projectController.deleteProject)

router.get('/get-project/:id', tokenChecker, projectController.getProject)

router.patch('/:id', tokenChecker, upload.single('projectImage'), projectController.editProject)
module.exports = router;