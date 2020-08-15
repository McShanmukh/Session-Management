const session = require('express-session');
const redisClient = require('../config/redis-client');
let RedisStore = require('connect-redis')(session)
var dotenv = require('dotenv')

dotenv.config()
const Max_age = process.env.MAX_AGE
const {NODE_ENV = 'devolopment',}=process.env
const inprod = NODE_ENV === 'production'

module.exports = session({ name:"Cookie-SID",
                            key: 'user_sid',
                            store: new RedisStore({ host: process.env.REDIS_IP, port: process.env.REDIS_PORT, client: redisClient}),
                            secret: process.env.REDIS_SECRET,
                            resave: false, 
                            saveUninitialized: true,
                            cookie: { maxAge: 1000,
                                    sameSite:true,
                                    secure: inprod}})