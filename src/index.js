const express = require('express');
const { establishDatabaseConnection } = require('./db/mongoose');
const Task = require('./models/task');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

establishDatabaseConnection('task-manager-api');

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});


app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);;
    } catch (error) {
        res.status(500).send();
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('There is not an user corresponding to id ' + req.params.id);
        } 
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('There is not a task corresponding to id ' + req.params.id);
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});