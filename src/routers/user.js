const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch (error) {
        res.status(400).send({error: error.toString() })
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({error: 'There is not an user corresponding to id ' + req.params.id});
        } 
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/users/:id', async (req, res) => {
    const paramsThatShouldBeUpdated = ['name', 'password'];
    const paramsFromRequest = Object.keys(req.body);

    const shouldUpdateDocument = paramsFromRequest.every((parameter) => paramsThatShouldBeUpdated.includes(parameter));

    if (!shouldUpdateDocument) {
        return res.status(400).send({error: 'Some of the input parameters can not be updated.'});
    }

    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).send({error: 'User with id ' + req.params.id + ' could not be found.'});
        }

        paramsFromRequest.forEach((param) => user[param] = req.body[param]);
        user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).send({error: 'User with id ' + req.params.id + ' could not be found.'});
        }

        res.send(deletedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;