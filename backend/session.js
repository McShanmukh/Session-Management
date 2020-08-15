const express = require('express')
const session = require('express-session')
var app = express
// Use the session middleware
app.use(session({ secret: process.env.REDIS_SECRET, cookie: { maxAge: process.env.MAX_AGE }}))
 
// Access the session as req.session
app.get('/login', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})



// const   {
//     port= 3001,
//     NODE_ENV='devolopment',
//     SESS_NAME='sid',
//     SESS_SECRET= 'ssh!quiet,it\'asecret',
//     SESS_TIME= 1000*60*900,

// } = process.env