const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../model/users');
const fs = require('fs');

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));



//var users = [];

var arrayList = [];

function validateEmail(email) {
    var mailformat = (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/);
    return mailformat.test(email)

}

function validatePassword(password) {
    var passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return passwordFormat.test(password)
}

router.get('/', (req, res, next) => {
    res.status(200).json({
        data: arrayList


    })
})

router.post('/signup', (req, res, next) => {


    // var abc = validateEmail(req.body.email)
    // console.log(abc)
    // console.log(req.body);
    // var cba = validatePassword(req.body.password)
    // console.log(cba)

    if (validateEmail(req.body.email) && validatePassword(req.body.password)) {


        var user = new User(req.body.name, req.body.username, req.body.email, req.body.password);

        // var user = {
        //     name: req.body.name,
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        //}
        arrayList.push(user);
        //fs.appendFileSync('./users.json', user.name + '  ' + user.password + ' ')
        res.status(200).json({
            status: 'success'
        })
    }
    else {
        res.status(200).json({
            status: 'failure'
        })
    }
})

module.exports = router