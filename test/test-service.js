'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const faker = require('faker');
const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { Service } = require('../service/models');
const { User } = require('../users/models');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

let token;

function cleanDB() {
    return new Promise((resolve, reject) => {
      mongoose.connection.dropDatabase()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

describe('Service', function () {
    before(() => {
        runServer(TEST_DATABASE_URL);
    });
    after(() => {
        cleanDB();
        closeServer();
    });

    it('should list items on GET', function () {
        return chai
            .request(app)
            .get('/service/posts/:username')
            .set('authorization', `Bearer ${token}`)
            .then(function(res) {
                expect(res).to.be.json
            })    
    });
});