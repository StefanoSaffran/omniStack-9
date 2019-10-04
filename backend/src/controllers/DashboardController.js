const Spot = require('../models/Spot')

module.exports = {
    show(req, res) {
        const { user_id } = req.headers;

        Spot.find({ user: user_id })
            .then(returnedSpots => res.json(returnedSpots))
    }
}