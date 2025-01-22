const express = require('express');
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const { rateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/shorten', rateLimiter,shortenUrl);
router.get('./:alias', redirectUrl); // Redirect to original URL

module.exports = router;





