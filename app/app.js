const express = require('express');

const authController = require('../controllers/auth/authController');
const postController = require('../controllers/post/postController');

const app = express();

app.use('/auth', authController );
app.use('/post',postController);

module.exports = app
