const { json } = require('express/lib/response');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

exports.authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, 'secretkey');
        console.log('userID >>>> ', user.userId)
        User.findByPk(user.userId).then(user => {

            console.log("autherization user",user);

            req.user = user; ///ver
            next();
        })

    }
     catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
    }

}