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

    if (validateEmail(req.body.email) && validatePassword(req.body.password)) {


        var user = new User(req.body.name, req.body.username, req.body.email, req.body.password);

    
        arrayList.push(user);
        fs.writeFileSync('./users.json', JSON.stringify(arrayList) + "\n")
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



router.post('/login',(req,res,next)=>{
    
    let vald = fs.readFileSync('./users.json',"utf8");
    let bald = JSON.parse(vald)

    for(var i =0;i<bald.length;i++){
        var username = bald[i].username;
        var password = bald[i].password;
        if (username===req.body.username&&password===req.body.password) {
            res.status(200).json({
                status: 'Login Successful'
            })
    }
    
    }
    res.status(200).json({
        status: 'Login Failed'
    })

})



module.exports = router