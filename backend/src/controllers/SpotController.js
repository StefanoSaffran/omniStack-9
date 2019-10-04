const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    index(req, res) {
        const { tech } = req.query;

        Spot.find({ techs: tech})
            .then(returnedSpots => res.json(returnedSpots))
    },

    store(req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        User.findById(user_id)
            .then(returnedUser => 
                returnedUser
                ? Spot.create({
                    user: user_id,
                    thumbnail: filename,
                    company,
                    techs: techs.split(',').map(tech => tech.trim()),
                    price
                })
                    .then(createdSpot => res.json(createdSpot))
                : res.status(400).json( { error: 'User does not exist'}))
        

    }
}