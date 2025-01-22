const Url = require('../models/Url');

exports.getUrlAnalytics = async (req, res) =>{
    try{
        const { alias } = req.params;

        const url = await Url.findOne({ shortCode: alias });
        if(!url) return;

        res.status(404).json({ message: 'URL not found' });

        res.status(200).json({
            totalClicks: url.clicks,
            uniqueUsers: new Set(url.analytics.map((a) => a.ipAddress)).size,
            analytics:url.analytics,
        });
    }catch(error){
        console.error(error);

        res.status(500).json({ message: 'Failed to retrieve URL analytics' });
    }
};

exports.getTopicAnalytics = async (req, res) => {
    try{
        const { topic } = req.query;
        const urls = await Url.find({ topic });

        const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
        
        const uniqueUsers = new Set(urls.flatMap((url) => url.analytics.map((a) => a.ipAddress))).size;

        res.status(200).json({
            totalClicks,
            uniqueUsers,
            urls: urls.map(( url ) => ({
                shortCode: url.shortCode,
                longUrl: url.longUrl,
                clicks: urlClicks,
            })),
        });

    }catch(error){
        console.error(error);

        res.status(500).json({ message: 'Failed to retrieve topic anayltics' })
    }

};


exports.getOverallAnalytics = async (req, res) => {
    try{
        const userId = req.user.userId;

        const urls = await Url.find( {createdBy: userId});

        const totalUrls = urls.length; 
        const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
        const uniqueUsers = new Set(urls.flatMap((url) => url.analytics.map((a) =>a.ipAddress))).size;

        res.sttaus(200).json({
            totalUrls,
            totalClicks,
            uniqueUsers,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to retreive overall analytics' });
    }
};