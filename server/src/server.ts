import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import screeningRoute from './routes/screenings/screeningsRoute'
import bookingRoute from './routes/booking/bookingRoute'


const app = express()

app.use(express.json())
app.use('/api/screenings', screeningRoute)
app.use('/api/booking', bookingRoute)

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`server run on port: ${port}`))
