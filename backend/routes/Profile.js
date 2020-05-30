const router = require('express').Router();
const verify = require('./Middleware/verifyToken')

router.get('/', verify , (req, res) => {
    res.json({
        posts: {
            title: 'Hey You!',
            description: 'Random Data that you ought not access.'
        }
    })
    res.send(req.user)
}) 

module.exports = router;