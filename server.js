const http = require('http');
const app = require('./app/app');

http.createServer(app).listen(5000, function () {
    console.log("server is running on port 5000");
});


