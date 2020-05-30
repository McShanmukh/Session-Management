var express = require('express')
var dotenv = require('dotenv')
const router = require('express').Router();
const passport = require('passport')
var app = express()
// Body Parser 
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
var cookieParser = require('cookie-parser')
const authroute = require('./routes/auth');
const route = require('./routes/Routes');
// const profileroute = require('./routes/Profile');
const mongoose = require('mongoose');
const user = require('./Models/Users');
const  redis     = require('redis');
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
app.use(cookieParser())

// session with cookie
// Use the session middleware
const {NODE_ENV = 'devolopment',}=process.env
const inprod = NODE_ENV === 'production'
app.use(session({ name:"Cookie-SID",
                  key: 'user_sid',
                  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient}),
                  secret: 'mightbesomething =here$#',
                  resave: false, 
                  saveUninitialized: true,
                  cookie: { maxAge: 1000*9,
                            sameSite:true,
                            secure: inprod}})),
redisClient.on("error", function(error) {
  console.error(error);
});

// redisClient.set("key", "value", redis.print);
// Access the session as req.session
app.get('/unknown', function(req, res, next) {
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
console.log(req.session)
redisClient.set("SID", req.sessionID, redis.print)
// redisClient.set("KKe", req.cookie, redis.print)
// redisClient.get("info", redis.print)

redisClient.get("SID",redis.print);
// console.log(i)
})

const check_tokn= (conn, token)=>{
  return conn.hget('login:',token)
  console.log(check_tokn)
}



// redirecting by preventing error while logging in
const redirectLogin = (req,res,next)=>{
  if  (!req.session.userId) {
    res.redirect('/login')
  }
  else{
  next()
  }
}

app.get('/home',redirectLogin, (req,res)=>{
          const {userId} = req.session
          res.send(`<h1>HEY THERE YOU'D AWESOME</h1>`)
})

router.post('/logout', redirectLogin , (req,res)=>{
  req.session.destroy(err => {
    if (err){
    return res.redirect('/home')
  }
	res.clearCookie('Cookie')
	res.redirect('/login')

})
})
 

// REDIS SETUP

  /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
//   const redisClient    = redis.createClient({
//     port      : 6379,               //  your port
//     host      : '127.0.0.1',        // your hostanme or IP address

//   });
// redisClient.on('connect', function () {
//   console.log('redis connected');
//   console.log(">>>>>> succesfully connected to this fucking redis from local host 🤦‍♂️ <<<<<<<<<" );
// }).on('error', function (error) {
//   console.log(error);
// });

//   redisClient.set('my test key', 'my test value', redis.print);
//   redisClient.get('my test key', function(error, result) {
//   if (error) throw error;
//   console.log('GET result ->', result)
// });


// connect to DB
dotenv.config()
mongoose.connect(process.env.DBPATH, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the Mongo database");
});
db.once("open", () => {
    console.log("> successfully opened the Mongo database");
});

app.use(express.json());
app.use(route)

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.get("/user", (req,res) => {
  console.log("getting user data!")
  res.send(user)
})

// app.get("/logout", (req, res) => {
//   console.log("Logging Out!")
//   user = {};
//   res.redirect("/")
// })

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Node listening on port %s', PORT)

 app.get('/', (request, response) => {
     response.json({ info: 'Node.js, Express and MySQL' })
   })

app.use(authroute)

// const redirectLogin = (req,res,next)=>{
//   // if  (!req.session.userId) {
//     //res.redirect('https://google.com')
// 	res.send({"redirect":true,"link":"www.google.com"})
// }

app.post('/logout', redirectLogin )
// app.use('/profile',profileroute)
