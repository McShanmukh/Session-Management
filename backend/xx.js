var express = require('express')
var dotenv = require('dotenv')
const router = require('express').Router();
const passport = require('passport')
var cookieParser = require('cookie-parser')
// const authroute = require('./routes/auth');
// const route = require('./routes/Routes');
// const profileroute = require('./routes/Profile');
const mongoose = require('mongoose');
// const user = require('./Models/Users');
const redis= require('redis');
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
const bcrypt = require('bcryptjs');
// const User = require('./Models/Users.js');
const models = require('./Models/Users.js');
const User = models.user
const UserData = models.userData


const cors= require('cors');
// cosnt moment = require('moment');

const dateFormat = require('dateformat');

var app = express()
// Body Parser 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})
);
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())

// session with cookie
// Use the session middleware
const PORT = process.env.PORT || 5000


const expiry_sec = 25

const redisClient = redis.createClient()
// const redisClient = redis.createClient('6379', '35.200.229.235')
// redisClient.on('connect', function() {
//     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Redis client connected<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
// });
// session with cookie
// Use the session middleware
const {NODE_ENV = 'devolopment',}=process.env
const inprod = NODE_ENV === 'production'

const store = new RedisStore({ host: '35.200.229.235', port: 6379, client: redisClient})
app.use(session({ name:"Cookie-SID",
                  key: 'user_sid',
                  store: store,
                  secret: 'mightbesomething =here$#',
                  resave: false, 
                  saveUninitialized: true,
                  cookie: { maxAge: 1000*9,
                            sameSite:true,
                            secure: inprod}}))

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


// app.use(route)

// CORS
app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next();
});



app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and MySQL' })
})



app.use((req,res,next) => {
    const {sesid} = req.body
    // console.log("sesid",sesid)
	if(sesid){
	store.get(sesid, (err,sessio) =>{
        //console.log(sessio)
        if(err){
        console.log("error",err)
        }
		if(typeof sessio !== undefined && sessio){	
            // store.touch(sesid, sessio, (err) => console.log(err))
            // req.session.destroy(err=>{ console.log(err)})
            // console.log("se",sessio.cookie)
            
            
            // req.session.foobar = Date.now();
            
            // let dat =  new Date(Date.now() + 1000*expiry_sec)
            // console.log("date",dateFormat(dat,"isoUtcDateTime"))
            // sessio.cookie.expires = dateFormat(dat,"isoUtcDateTime")
            // sessio.cookie.originalMaxAge += 1000*expiry_sec
            req.session.cookie = sessio.cookie
            req.session.email = sessio.email
            
            // req.session.cookie.expires = new Date(Date.now() + 10000)
            // req.session.cookie.maxAge = 10000
            // sessio.cookie.maxAge = 1000*expiry_sec;
            // console.log("maxage2",sessio.cookie)
            // store.set(sesid,sessio,(err) => console.log(err))

            // redisClient.set(sesid,sessio,'EX',60,(err) => console.log(err))
            // redisClient.expire(sesid, 300)
            // store.touch(sid, session, (err) => console.log(err))
            // console.log("req",req.session.cookie)
            
            // console.log("session-email",req.session.email)
		}
	})
	}
	next();
})

const redirectLogin = (req,res,next) => {
    if(!req.session.email){
        res.send("plslogin")
    }
    else{
        next()
    }
}

const redirectProfile = (req,res,next) => {
    if(req.session.userId){
        res.redirect("/profile")
    }
    else{
        next()
    }
}

// app.get('*', (req, res, next) => {
//     req.session.foobar = Date.now();
//     next();
// })




app.post("/login", async (req,res)=>{
    const {email,password} = req.body


    const emailExist =  await User.findOne({email: email});
    // if (!emailExist) return res.status(400).send('Email doesnot exist. Go Ahead and Register');
    if (!emailExist) return res.send({'verified':'false','error':'Email doesnot exist. Go Ahead and Register'});
    
    const validPass =  await bcrypt.compare(password, emailExist.password);
    // if (!validPass) return res.status(400).send('Invalid Password. Please try Again')
    if (!validPass) return res.send({'verified':'false','error':'Invalid Password. Please try Again'})
    res.setHeader('Content-Type', 'text/html')

    if(emailExist && validPass){
        // const user = users.find(
        //     user => user.email ===email && user.password === password
        // )
        
        req.session.email = email
        console.log("sucess!!!")
        console.log(req.session.id)
        //console.log(JSON.stringify(req.session.cookie))
        //console.log("login1")
        //console.log(res)
        return res.send({"verified":"true","useremail":JSON.stringify(req.session.email),"session-id":req.session.id})
        
    }
	else{
	console.log("failure")
    res.send({"verified":"false","redirect":"login"})
    }
    // res.send("error")
})



// REGISTER
app.post('/register', async (req, res) => {

    //If the USER is already in the Database
      const emailExist = await User.findOne({email: req.body.email});
      if (emailExist) return res.send({'verified':'false','error':'Email Already Exists'});

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
         req.session.email = req.body.email
         res.send({"verified":"true","useremail":JSON.stringify(req.session.email),"session-id":req.session.id})
        // res.send(savedUser);
        console.log(savedUser);
     } catch (err) {
         console.log(err)
         res.send(err)
    }
});


//PROFILE
app.post("/profile",(req,res)=>{
	//const {session} = 
	//const {sesid} = req.body
	//console.log(req.session)
	/*
	store.get(sesid, (err,sessio) =>{
		console.log("error",err)
		console.log("session-cos",sessio)
	})
	*/
    // const user = users.find(user => user.id === req.session.email)
    const user = req.session.email
    //console.log("session-id",req.session.id)
    //console.log("session-id",req.session.email)
	if(user){
    res.send({"user-email":user,"session":"active","session-id":req.session.id})
    // res.send({"user-email":user.email,"user-name":user.name,"session":"active","session-id":req.session.id})
	}
	else{
	res.send({"session":"expired"})
	}
})


//Get User Details


app.post("/details",  (req,res)=>{
    const user2 = req.session.email
    
	if(user2){
        // console.log("user2",user2)

        // const emailExist =   User.findOne({email: user2}).populate("details").exec((err,userdat) =>{
        //     if(err){
        //         // return res.send("erroe")
        //         console.log("error",err)
        //         return res.send("error!")
        //     }
        //     else{
        //         // console.log(userdat)
        //         if(userdat !== null){
        //         return res.send({"data":"true","Bio":userdat.details.Bio,"Profession":userdat.details.Profession})
        //         }
        //         else{
        //             return res.send({"data":"false"})
        //         }
        //     }

        // })
        User.findOne({email: user2,details:{ $exists:true,$ne:null}}).populate("details").exec()
            .then((resss)=>{
                // console.log("ress",resss);res.send("ok");
                
                // console.log(userdat)
                if(resss && resss.details !== null){
                return res.send({"data":"true","Bio":resss.details.Bio,"Profession":resss.details.Profession})
                }
                else{
                    return res.send({"data":"true","Bio":"","Profession":""})
                }

            })
            .catch(err =>{
                console.log("errroee",err)
                return res.send({"data":"false"})
            })

        // return res.send("verified")
	}
	else{
	    return res.send({"session":"expired"})
    }
    // res.send({"session":"expired"})
})


//Add User Details
app.post("/adddetails",(req,res)=>{
    var user_email = req.session.email
    const {bio,Profession,type} = req.body
    
    if(user_email){
        // User.findOne({email:user_email},{_id:1})
        // UserData.insert({bio:bio})
        if(type === "insert"){
            insertBio(bio,Profession)
                .then((insert_res) => {
                    User.updateOne({email:user_email},{$set:{"details":insert_res._id}})
                    .then(user_res => {
                        
                        
                        if(user_res !== null){
                            return res.send({"response":"sucefully inserted","session":""})
                        }
                        else{
                            return res.send({"response":"user details not found","session":""})
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return res.send({"response":"error"})
                    })
                })
                .catch(err => {
                    console.log(err);
                    return res.send({"response":"error"})
                })
        }
        else if(type === "update"){
            User.findOne({email:user_email},{_id:1,details:1})
                .then(out => {
                    // console.log(out)
                    UserData.updateOne({_id:out.details},{$set:{"Bio":bio,"Profession":Profession}})
                        .then(ins => {
                            return res.send({"response":"sucefully inserted","session":""})
                        })
                        .catch(err=>{
                            console.log(error)
                            return res.send({"response":"error"})
                        })
                })
                .catch(err => {
                    console.log(err);
                    return res.send({"response":"error"})
                })
            // res.send("details")
        }
    }
    else{
        res.send({"session":"expired"})
    }
    
})


app.post("/logout",(req,res)=>{
    // const user = req.session.email
	// if(user){
    // res.send({"user-email":user,"session":"active","session-id":req.session.id})
    // req.session.destroy(err=>console.log(err))
    // // res.send({"user-email":user.email,"user-name":user.name,"session":"active","session-id":req.session.id})
	// }
	// else{
	// res.send({"session":"expired"})
    // }
    req.session.destroy(err=>console.log(err))
    res.clearCookie('Cookie-SID')
})



app.listen(PORT,() => console.log(`app listening on port ${PORT}`))