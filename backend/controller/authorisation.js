const models = require('../Models/Users');
const bcrypt = require('bcryptjs');

const User = models.user
// REGISTER
async function register(req, res) {


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
         res.send({
                "verified":"true",
                "useremail":JSON.stringify(req.session.email),
                "session-id":req.session.id
            })
        // res.send(savedUser);
        console.log(savedUser);
     } catch (err) {
         console.log(err)
         res.send(err)
    }
}

async function login(req, res) {

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
}

module.exports = {
    login,
    register
};