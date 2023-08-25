import express from 'express'
import { validateOnCreate } from './validations'
import { CreateBookingInput } from './validationScheme'
import { isSeatExist, GetSeatBookingStatus, createBooking, updateBooking } from '../../db/seatBookingsDB'
import { isScreeningValid } from '../../db/screeningsDB'
import { internalServerError } from '../../utils'

const router = express.Router()

/**
 * create new booking
 * body:
 * userId: number
 * screeningId: number
 * seatInRoomId: number
 * price: number
 */
router.post('/reserve-seat', validateOnCreate, async (req, res) => {
    const input = res.locals.createBookingInput as CreateBookingInput
    if (!input) {
        return res.sendStatus(500)
    }
    try {
        if (!await isSeatExist(input.seatInRoomId)) {
            return res.status(404).send({ error: 'Seat not found', errorCode: 'seat_not_found' })
        }

        if (!await isScreeningValid(input.screeningId)) {
            return res.status(404).send({ error: 'Screening not found', errorCode: 'screening_not_found' })
        }

        const { status, id } = await GetSeatBookingStatus(input.screeningId, input.seatInRoomId)
        if (status === 'reserved' || status === 'paid') {
            return res.status(400).send({ error: 'Seat is already reserved', errorCode: 'seat_already_reserved' })
        } else if (status === 'cancelled') {
            const idUpdate = await updateBooking(id!, { status: 'reserved' })
            return res.send({ bookingId: idUpdate, status: 'reserved' })
        }

        const bookingId = await createBooking(input)
        res.send({ bookingId, status: 'reserved' })
    } catch (error) {
        return internalServerError(error as Error, res)
    }
})

/**
 * cancel booking
 * params:
 * seatBookingId: number
 */
router.put('/cancel-booking/:seatBookingId', async (req, res) => {
    const seatBookingId = parseInt(req.params.seatBookingId)
    if (!seatBookingId) {
        return res.sendStatus(400)
    }

    const bookingId = await updateBooking(seatBookingId, { status: 'cancelled' })

    res.send({ bookingId, status: 'cancelled' })
})


export default router