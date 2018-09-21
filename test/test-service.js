'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { Service } = require('../service/router');
const { JWT_SECRET, DATABASE_URL } = require('../config');

chai.use(chaiHttp);

const token = jwt.sign(
    {
        user :{
            username: "user4"
        }
    },
    JWT_SECRET,
    {
        algorithm: 'HS256',
        expiresIn: '7d'
    }
);

describe('Service', function () {
    before(() => {
        return runServer(DATABASE_URL);
    });
    after(() => {
        return closeServer();
    });

    it('should list items on GET', function () {
        return chai
            .request(app)
            .get('/api/service/posts/testuser')
            .set('Authorization', `Bearer ${token}`)
            .then(function(res) {
                expect(res).to.have.status(200)
            })    
    });

    it('should add items on POST', function () {
        const newPost = {
            username: "testuser",
            description: "Oil Change",
            date: "09/18/2018",
            miles: "15000",
            cost: "50"
        }

        return chai
            .request(app)
            .post('/api/service/posts')
            .set('Authorization', `Bearer ${token}`)
            .send(newPost)
            .then(function(res) {
                expect(res).to.have.status(201)
            })    
    });

    it('should delete items on DELETE', function () {
        return chai
            .request(app)
            .get('/api/service/posts/testuser')
            .set('Authorization', `Bearer ${token}`)
            .then(function(res) {
                return chai.request(app)
                    .delete(`/api/service/posts/${res.body[0].id}`)
                    .set('Authorization', `Bearer ${token}`)
            }) 
            .then(function(res) {
                expect(res).to.have.status(204)
            });   
    });

    it('should update items on PUT', function () {
        const updateData = {
            username: "testuser",
            description: "Oil Change",
            date: "09/10/2018",
            miles: "15000",
            cost: "60"
        }
        return chai
            .request(app)
            .get('/api/service/posts/testuser')
            .set('Authorization', `Bearer ${token}`)
            .then(function(res) {
                return chai.request(app)
                    .put(`/api/service/posts/${res.body[0].id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(updateData)
            }) 
            .then(function(res) {
                expect(res).to.have.status(204)
            });   
    });

});