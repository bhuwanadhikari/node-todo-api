var {User} = require('./../models/user');

var authenticate = (req, res, next) => { // req, res are the same thing as that of req and res in the /users/me route

    var token = req.header('x-auth'); // getting the header it is just like setting the header as res.header()

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject(); // res.send will not execute and will be go to catch block
        }
        req.user = user; // adding user key to req as req is same for the /users/me route
        req.token = token; // adding token to req as req is same for the /users/me route
        next();
    }).catch((e) => {
        res.status(401).send();
    });

};

module.exports = {authenticate};