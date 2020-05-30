const router = require('express').Router();
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20');

router.use(passport.initialize())



passport.use('GoogleOAuth',new googleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: '374610729004-49cmg94ufnra0gf178qd9id6h7ptdegl.apps.googleusercontent.com',
    clientSecret: 'GnNAWOdMW7Jm63t3wjCU458B'
}, (accessToken, refreshToken, profile, done) => {
  console.log("Access Token",accessToken)
  console.log("Refresh Token",accessToken)
  console.log("Profile",accessToken)
}))

router.post('/oauth/google',passport.authenticate('GoogleOAuth', {session: false}))

module.exports = router;