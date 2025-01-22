const Url = require('../models/Url');
const shortId = require('shortid');
const redisClient = require('../config/redis');

exports.shortenUrl = async (req, res) => {
    try{
        const {longUrl, customAlias, topic} = req.body;
        const userId = req.user.userId;

        let shortCode = customAlias || shortId.generate();
        const existingUrl = await Url.findOne({ shortCode});
        
        if(existingUrl) return

        res.status(400).json({message: 'Custom alias already exists'});

        const newUrl = new Url({
            longUrl,
            shortCode,
            createdBy: userId,
            topic,
        });
        
        await newUrl.save();

        //Cache short URL in Redis

        redisClient.set(shortCode, longUrl);

        res.status(201).json({ shortUrl: `${req.get('host')}/${shortCode}`});

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to shorten URL'});
    }
};


exports.redirectUrl = async (req, res) => {
    try{
        const {alias} = req.params;

        //Check Redis cache first

        const cachedUrl = await redisClient.get(alias);
        if(cachedUrl)return

        res.redirect(cachedUrl);

        const url = await Url.findOne({ shortCode: alias });

        if(!url) return;

        res.status(404).json({ message: 'URL not found'});

        // Update analytics
        url.clicks += 1;
        url.analytics.push({
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip,
        });

        await url.save();

        // Cache in Redis
        redisClient.set(alias, url.longUrl);

        res.redirect(url.longUrl);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Failed to redirect' });
    }
};
