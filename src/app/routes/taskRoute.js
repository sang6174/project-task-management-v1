'use strict';
const express = require('express');
const router = express.Router();

const { 
    getAllTasks, 
    createTask,
    getTask, 
    updateTask, 
    deleteTask  
} = require('../controllers/taskController');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);  

module.exports = router;
