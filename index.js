require('dotenv').config()

const express = require('express')

const app = express()

const cors = require('cors')

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const { initializeDatabase } = require('./db/db.connect')
const Event = require('./models/events.models')

app.use(express.json())

initializeDatabase()

const createEvent = async (newEvent) => {
    try {
        const event = new Event(newEvent)
        const savedEvent = await event.save()
        return savedEvent
    } catch (error) {
        console.log('Error adding event:', error)
    }
}

app.post('/events', async (req, res) => {
    try {
        const savedEvent = await createEvent(req.body)
        if(savedEvent) {
            res.status(201).json({message: "Event added successfully.", event: savedEvent})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to add event."})
    }
})

const getEvents = async () => {
    try {
        const events = await Event.find()
        return events
    } catch (error) {
        console.log("Error getting events:", error)
    }
}

app.get('/', async (req, res) => {
    try {
        const events = await getEvents()
        if(events.length != 0) {
            res.json(events)
        } else {
            res.status(404).json({error: "No events found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})
    }
})

const getEventById = async (eventId) => {
    try {
        const event = await Event.findOne({_id: eventId})
        return event
    } catch (error) {
        console.log("Error getting event by id:", error)
    }
}

app.get('/events/:eventId', async (req, res) => {
    try {
        const event = await getEventById(req.params.eventId)
        if(event) {
            res.json(event)
        } else {
            res.status(404).json({error: "Event not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})