const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorScema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    username: String,
    password: String
});

authorScema.pre('save', function(next){
    const username = this.name.toLowerCase().replace(/\s/g, '');
    const password = `${this.name}${this.age}`;
    this.username = username;
    this.password = password;
    next();
});

module.exports = authorScema;