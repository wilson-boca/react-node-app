const express = require('express');
const { authenticate } = require('../middleware/authenticate');

const projectsController = require('../controllers/projects-controller');

const router = express.Router();

router.post('/projects', authenticate, projectsController.postProject);

router.get('/projects', authenticate, projectsController.getProject);

router.put('/projects/:id', authenticate, projectsController.putProject);

router.delete('/projects/:id', authenticate, projectsController.deleteProject);

module.exports = router;
