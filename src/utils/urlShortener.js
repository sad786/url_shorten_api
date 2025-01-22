const shortid = require('shortid');

exports.generateShortCode = (customAlias) => {
    // Use Custom alias if provided,
    // otherwise generate a random short code

    return customAlias || shortid.generate();
};





