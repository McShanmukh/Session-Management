const redis = require('redis');
var dotenv = require('dotenv')

dotenv.config()
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_IP)
redisClient.on('connect', function() {
    console.log('>->->->->->->->->->->->->->->-> Redis client connected <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<');
});

module.exports = redisClient;
