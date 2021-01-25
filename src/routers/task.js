const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({error: 'There is not a task corresponding to id ' + req.params.id});
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const paramsThatShouldBeUpdated = ['description', 'completed'];
    const paramsFromRequest = Object.keys(req.body);

    const shouldUpdateDocument = paramsFromRequest.every((parameter) => paramsThatShouldBeUpdated.includes(parameter));

    if (!shouldUpdateDocument) {
        return res.status(400).send({error: 'Some of the input parameters can not be updated.'});
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false, runValidators: true }); // {useFindAndModify: false} : avoid deprecation warning

        if (!updatedTask) {
            return res.status(404).send({error: 'Task with id ' + req.params.id + ' could not be found.'});
        }

        res.send(updatedTask);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).send({error: 'Task with id ' + req.params.id + ' could not be found.'});
        }

        res.send(deletedTask);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;