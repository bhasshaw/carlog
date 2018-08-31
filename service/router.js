'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Service} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET

router.get('/hello', (req, res) => {
    res.status(200).send('hello world');
});

router.get('/posts', (req, res) => {
    Service
      .find()
      .then(posts => {
        res.json(posts.map(post => post.serialize()));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
      });
  });
  
  // POST
  
router.post('/posts', (req, res) => {
    const requiredFields = ['date', 'description', 'miles', 'cost'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
        }
    }

    Service
        .create({
            date: req.body.date,
            description: req.body.description,
            miles: req.body.miles,
            cost: req.body.cost 
        })
        .then( serviceLog => res.status(201).json(serviceLog.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });

});

module.exports = {router};