'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { Service } = require('../service/models');
const { User } = require('../users/models');
const { JWT_SECRET, DATABASE_URL } = require('../config');

chai.use(chaiHttp);

let token;

// function cleanDB() {
//     return new Promise((resolve, reject) => {
//       mongoose.connection.dropDatabase()
//         .then((result) => {
//           resolve(result);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
// };

describe('Service', function () {
    before(() => {
        runServer(DATABASE_URL);
    });
    after(() => {
        // cleanDB();
        closeServer();
    });

    it('should list items on GET', function () {
        return chai
            .request(app)
            .get('/posts/:username')
            .set('authorization', `Bearer ${token}`)
            .then(function(res) {
                expect(res).to.have.status(200)
            })    
    });
});