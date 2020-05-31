const session = require('express-session');
const redisClient = require('../config/redis-client');
let RedisStore = require('connect-redis')(session)

const {NODE_ENV = 'devolopment',}=process.env
const inprod = NODE_ENV === 'production'

module.exports = session({ name:"Cookie-SID",
key: 'user_sid',
store: new RedisStore({ host: '35.200.229.235', port: 6379, client: redisClient}),
secret: 'mightbesomething =here$#',
resave: false, 
saveUninitialized: true,
cookie: { maxAge: 60000,
          sameSite:true,
          secure: inprod}})