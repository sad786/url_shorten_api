const {RateLimiterRedis} = require('rate-limiter-flexible');

const redisClient = require('../config/redis');

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 10,
    duration: 60,
});

exports.rateLimiter = (req, res, next) => {
    rateLimiter
        .consumer(req.ip)
        .then(() =>{next()})
        .catch(() =>{
            res.status(429).json({message: 'Too many requests'});
        });
};