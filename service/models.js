'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const serviceSchema = mongoose.Schema({
    date: Date,
    description: String,
    miles: Number,
    cost: Number,
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

const Service = mongoose.model('LogPost', serviceSchema);

module.exports = {Service};