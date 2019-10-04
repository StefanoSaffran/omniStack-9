const User = require('../models/User')
module.exports = {
    store(req, res) {
        const { email } = req.body;

        User.findOne( { email })
            .then(returnedUser => 
                 returnedUser 
                ? res.json(returnedUser)
                : User.create({ email })
                    .then(createdUser => res.json(createdUser))
            )     
    }
}