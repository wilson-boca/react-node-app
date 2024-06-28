const express = require('express');
const { authenticate } = require('../middleware/authenticate');

const tasksController = require('../controllers/tasks-controller');

const router = express.Router();

router.post('/projects/:id/tasks', authenticate, tasksController.postTask);

router.get('/projects/:id/tasks', authenticate, tasksController.getTask);

router.put('/tasks/:id', authenticate, tasksController.putTask);

router.delete('/tasks/:id', authenticate, tasksController.deleteTask);

module.exports = router;
