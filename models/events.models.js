const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['Online', 'Offline'],
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    speakers: [{
        name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    },
    venue: {
        type: String
    },
    hostedBy: {
        type: String,
        required: true
    },
    additionalInformation: {
        dressCode: {
            type: String,
            default: 'None'
        },
        ageRestrictions: {
            type: String,
            default: 'None'
        }
    }
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema)

module.exports = Event