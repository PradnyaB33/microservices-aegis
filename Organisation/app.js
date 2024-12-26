const express = require('express');
const organisation = require('./routes/organisationRoute');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Organisation Microservice!');
});

app.use("/route/organization", organisation);

module.exports = app;
