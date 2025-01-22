const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl: {type: String, required: true},
    shortCode: {type: String, required: true, unique: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
    topic: {type: String, default: null},
    clicks: {type: Number, default: 0},
    analytics: [
        {
            timestamp: {type:Date, default: Date.now},
            userAgent: {type: String},
            ipAddress: {type: String},
        },
    ],
});

module.exports = mongoose.model('Url',urlSchema);