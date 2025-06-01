'use strict';
const TaskModel = require('../models/TasksModel');
const asyncWrapper = require('../middlewares/async');
const { CustomAPIError } = require('../../config/errors/custom-error');   

// src/app/controllers/taskController.js
// Task Controller
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskId} = req.params;
    const task = await TaskModel.findOne({_id: taskId});

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    };
    return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskId} = req.params;
    const task = await TaskModel.findOneAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    });

    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    };
    return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskId} = req.params;
    const task = await TaskModel.findOneAndDelete({_id: taskId});
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    };
    res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };