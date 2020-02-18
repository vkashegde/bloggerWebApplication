const express = require('express');
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');
const Posts = require('../../model/posts')


router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

let postList = [];

router.get('/getpost',(req,res,next)=>{
    res.status(200).json({
        data:postList
    })
})

router.post('/createpost', (req, res, next) => {

    if (req.body.title && req.body.content != null) {

        let post = new Posts(req.body.title, req.body.content);
        postList.push(post);
        fs.appendFileSync('./users.json', post.title + ' : ' + post.content + ' ')
        res.status(200).json({
            status: 'Posted'
        })

    } else {
        res.status(200).json({
            status: 'Failed'
        })

    }

})

module.exports = router;