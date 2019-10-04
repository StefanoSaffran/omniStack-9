const Booking = require('../models/Booking');

module.exports = {
    store(req, res) {
        const { booking_id } = req.params;
        console.log(booking_id);
        Booking.findById(booking_id).populate('spot')
            .then(booking => {
                booking.approved = false;
                return booking.save()})
            .then(rejectedBooking => {
                const bookingUserSocket = req.connectedUsers[rejectedBooking.user];
                if (bookingUserSocket) {
                    req.io.to(bookingUserSocket).emit('booking_response', rejectedBooking)
                }
                return res.json(rejectedBooking)
            })
    }
}