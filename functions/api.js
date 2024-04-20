const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const dbCloudUrl = "mongodb+srv://mark1:zci5KHjd7wUsqcwe@cluster0.fksli2l.mongodb.net/?";
const dbLocalUrl = "mongodb://localhost:27017/mongo-test";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connect to mongodb
mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error("Failed to connect to MongoDB", error));

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);