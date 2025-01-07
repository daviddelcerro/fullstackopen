const express = require('express');
const app = express();
exports.app = app;
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger.js');
const middleware = require('./utils/middleware.js');
const config = require('./utils/config.js');
const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const url = config.MONGODB_URI

mongoose.set('strictQuery', false);

logger.info('connecting to', url)

mongoose.connect(url)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((err) => {
       logger.error('error connecting to MongoDB:', err.message)
    })



app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, middleware.tokenExtractor, blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;




