let { generatePassword } = require('../../config/passwordAuth');
let passport = require('passport');
let User = require('../models/user.server.model');

exports.logoutUser = (req, res) => {
    req.logout();
    res.json('Logged out successfully');
}

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err){
            return res.status(501).json(err);
        }
        if (!user){
            return res.status(501).json(info);
        }
        req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json(user);
        });
    })(req, res, next);
}

exports.registerUser = (req, res) => {
    const saltHash = generatePassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
        hash: hash,
        salt: salt
    })

    User.find({"username": newUser.username}, (err, user) => {
        if(Object.entries(user).length === 1){
            return res.status(501).json(err);
        }
        else{
            newUser.save()
            .then((user) => {
                return res.status(200).json(user);
    })
        }
    })

    /*newUser.save()
    .then((user) => {
        return res.status(200).json(user);
    })

    

    res.json('Registered user successfully');*/
}