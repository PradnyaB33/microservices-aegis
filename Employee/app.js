const express = require('express');
const employee = require('./routes/EmployeeRoute');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Employee Microservice!');
});

app.use("/route/employee", employee);

module.exports = app;
