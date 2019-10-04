const Booking = require('../models/Booking')

module.exports = {
    store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body

        Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        })
            .then(createdBooking => createdBooking.populate('spot').populate('user').execPopulate())
            .then(populatedBooking => {
                const ownerSocket = req.connectedUsers[populatedBooking.spot.user];
                if (ownerSocket) {
                    req.io.to(ownerSocket).emit('booking_request', populatedBooking)
                }
                return res.json(populatedBooking)
            })
    }
}