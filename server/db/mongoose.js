const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@ds117858.mlab.com:17858/node');

module.exports = {mongoose};