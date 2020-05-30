const router = require('express').Router();
router.use(require('cookie-parser')());
const User = require('../Models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
const  redis     = require('redis');

// router.use(require('./cookie.js'));
 
// router.get('/profile', function (req, res) {
 
//     res.send(JSON.stringify(req.cookies));
 
// });
 


let redisClient = redis.createClient()
// router.use(cookieParser())

// session with cookie
// Use the session middleware
const {NODE_ENV = 'devolopment',}=process.env
const inprod = NODE_ENV === 'production'
router.use(session({ name:"Cookie",
                  store: new RedisStore({ client: redisClient }),
                  secret: 'mightbesomething =here!$#',
                  resave: false, 
                  saveUninitialized: true,  
                  cookie: { maxAge: 1000*9,
                            sameSite:true,
                            // path:'/profile',
                            secure: inprod}})),

// REGISTER
router.post('/register', async (req, res) => {

    //If the USER is already in the Database
      const emailExist = await User.findOne({email: req.body.email});
      if (emailExist) return res.status(400).send('Email Already Exists');

    // // Hash Passwords
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword,
        passwordConfirm: hashPassword     
    })

     try{
         const savedUser = await user.save();
        res.send(savedUser);
        console.log(savedUser);
     } catch (err) {
         res.status(400).send(err)
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    console.log(req)

    const emailExist = await User.findOne({email: req.body.email});
    // if (!emailExist) return res.status(400).send('Email doesnot exist. Go Ahead and Register');
    if (!emailExist) return res.send('Email doesnot exist. Go Ahead and Register');
    
    const validPass = await bcrypt.compare(req.body.password, emailExist.password);
    // if (!validPass) return res.status(400).send('Invalid Password. Please try Again')
    if (!validPass) return res.send('Invalid Password. Please try Again')
    res.setHeader('Content-Type', 'text/html')
    // res.setHeader()

    console.log(req.sessionID)
    console.log(req.session.cookie)
    req.session.cookie.path = '/profile'


    //Assign JWT Token
    
    // const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE});
    // const refreshToken = jwt.sign({ _id: User._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE})
    // res.header('auth-token', token).send(token);

    res.send('Logged IN');
    res.end()

});

// Display profile
// const redirectLogin = (req,res,next)=>{
//     // if  (!req.session.userId) {
//       res.redirect('http://google.com')
//     }
  //   else{
  //     next()
  //   }
  // }
// router.get('/home',redirectLogin, (req,res)=>{
//     const {userId} = req.session
//     res.send(`<h1>HEY THERE YOU'D AWESOME</h1>`)
// })
// router.post('/logout', redirectLogin )
// router.

module.exports = router;

