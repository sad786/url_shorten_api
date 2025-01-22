const {OAuth2Client} = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignIn = async (req, res) => {

    try{
        const {token} = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const {email, name, sub: googleId} = ticket.getPayload();

        let user = await User.findOne({googleId});

        if(!user){
            user = new User({googleId, email, name});
            await user.save();
        }

        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: 'id' });

        res.status(200).json({token: jwtToken });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Authentication failed' });
    }
};

