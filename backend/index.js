require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/users-route');
const projectRoute = require('./routes/projects-route');
const taskRoute = require('./routes/tasks-route');
const swaggerRoute = require('./routes/swagger');

app = express();

app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');  
    next();
  });

app.use(express.json());
app.use('/api/v1', userRoute);
app.use('/api/v1', projectRoute);
app.use('/api/v1', taskRoute);
app.use('/api/v1', swaggerRoute);

const dbHost = process.env.DB_HOST;

mongoose.connect(`mongodb://${dbHost}:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(8000);
    console.log("########## Connected to the database ##########");
})
.catch(err => {
    console.log(err);
});

