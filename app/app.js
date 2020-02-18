const express = require('express');
//const bodyParser = require('body-parser');

const authController = require('../controllers/auth/authController');
const postController = require('../controllers/post/postController')
const app = express();

app.use('/auth', authController );
app.use('/post',postController);


// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

module.exports = app
