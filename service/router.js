'use strict';
const express = require('express');

const passport = require('passport');

const {Service} = require('./models');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });


// GET

router.get('/posts/:username', jwtAuth, (req, res) => {
    Service
        .find({username: req.params.username}).sort({'date': -1})
        .then(posts => {
            res.json(posts.map(post => post.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

router.get('/post/:id',jwtAuth, (req, res) => {
    Service
        .findById(req.params.id)
        .then(post => res.json(post.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});
  
// POST
  
router.post('/posts', jwtAuth, (req, res) => {
    const requiredFields = ['username', 'date', 'description', 'miles', 'cost'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
        }
    }

    Service
        .create(req.body)
        .then( serviceLog => res.status(201).json(serviceLog.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });

});

// PUT

router.put('/post/:id', jwtAuth, (req, res) => {
    const requiredFields = ['id', 'date', 'description', 'miles', 'cost'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating service item \`${req.params.id}\``);

    const toUpdate = {
        id: req.body.id,
        date: req.body.date,
        description: req.body.description,
        miles: req.body.miles,
        cost: req.body.cost
    };

    Service
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .then(updatedPost => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

// DELETE

router.delete('/posts/:id', jwtAuth, (req, res) => {
  Service
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

module.exports = {router};