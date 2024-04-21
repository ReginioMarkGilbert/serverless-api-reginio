const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const dbCloudUrl = "mongodb+srv://mark1:zci5KHjd7wUsqcwe@cluster0.fksli2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbLocalUrl = "mongodb://localhost:27017/serverless-api";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connect to mongodb
mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error("Failed to connect to MongoDB", error));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);