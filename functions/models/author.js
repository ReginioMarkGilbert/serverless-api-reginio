const mongoose = require('mongoose');
const authorSchema = require('../schema/author');

const authorModel = mongoose.model('Author', authorSchema);

module.exports = authorModel;