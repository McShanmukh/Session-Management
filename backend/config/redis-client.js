const redis = require('redis');

const redisClient = redis.createClient('6379', '35.200.229.235')
redisClient.on('connect', function() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Redis client connected<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
});

module.exports = redisClient;
