const mongoose = require('mongoose');
const config = require('./utils/config');

const SpotSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    price: {
        type: String
    },
    techs: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

SpotSchema.virtual('thumbnail_url').get(function() {
    return `${config.IPADDRESS}:${config.PORT}/files/${this.thumbnail}`
})

SpotSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

module.exports = mongoose.model('Spot', SpotSchema);