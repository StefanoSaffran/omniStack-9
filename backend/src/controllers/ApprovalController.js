const Booking = require('../models/Booking');

module.exports = {
    store(req, res) {
        const { booking_id } = req.params;
        console.log(booking_id);
        Booking.findById(booking_id).populate('spot')
            .then(booking => {
                booking.approved = true;
                return booking.save()})
            .then(aprovedBooking => {
                const bookingUserSocket = req.connectedUsers[aprovedBooking.user];
                if (bookingUserSocket) {
                    req.io.to(bookingUserSocket).emit('booking_response', aprovedBooking)
                }
                return res.json(aprovedBooking)
            })
    }
}