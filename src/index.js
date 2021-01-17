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


app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send('There is not an user corresponding to id ' + req.params.id);
        } 

        res.send(user);
    }).catch((error) => {
        res.status(500).send();
    });
});

/* app.get('/users/:email', (req, res) => {
    User.findOne({email: req.params.email}).then((user) => {
        if (!user) {
            res.send('The email ' + req.params.email + ' is not registered.');
        } else {
            res.send(user);
        }
    }).catch((error) => {
        res.status(400).send(error);
    });
}); */

app.patch('/users/:id', (req, res) => {
    User.updateOne({_id: req.params.id}).then(() => {

    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then((task) => {
        if (!task) {
            return res.status(404).send('There is not a task corresponding to id ' + req.params.id);
        }

        res.send(task);
    }).catch((error) => {
        res.status(500).send();
    });
});