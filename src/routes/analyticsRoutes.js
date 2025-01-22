const express = require('express');

const {
    getUrlAnalytics,
    getTopicAnalytics,
    getOverallAnalytics,

} = require('../controllers/analyticsController');

const router = express.Router();

router.get('/url/:alias',getUrlAnalytics);  // Analytics for a specific URL

router.get('/topic', getTopicAnalytics);  // Analytics for a topic

router.get('/overall', getOverallAnalytics); // Overall analytics for a user

module.exports = router;



