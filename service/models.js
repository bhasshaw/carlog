'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const serviceSchema = mongoose.Schema({
    username: {
        type: String
    },
    date: {
        type: String,
        default: Date.now,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    miles: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

serviceSchema.methods.serialize = function() {
    return {
        id: this._id,
        date: this.date,
        description: this.description,
        miles: this.miles,
        cost: this.cost
    };
};

const Service = mongoose.model('Service', serviceSchema);

module.exports = {Service};