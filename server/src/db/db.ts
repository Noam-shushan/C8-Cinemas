import knex from 'knex'
import dotenv from 'dotenv'
import { ScreeningRoom, Movie, Screening, SeatBooking, SeatInRoom } from './types'

dotenv.config()

const db = knex({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: Number(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true' ? true : false
        }
    },
    migrations: {
        tableName: 'migrations'
    }
})

// Export tables with types
export const ScreeningRooms = () => db<ScreeningRoom>('screeningRooms')
export const Movies = () => db<Movie>('movies')
export const Screenings = () => db<Screening>('screenings')
export const SeatsInRoom = () => db<SeatInRoom>('seatsInRoom')
export const SeatBookings = () => db<SeatBooking>('seatBookings')









