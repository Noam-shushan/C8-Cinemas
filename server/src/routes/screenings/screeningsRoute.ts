import express from 'express'
import { validateQueryOnGetAll } from './validations'
import { getScreenings, getAvailableSeats } from '../../db/screeningsDB'
import { internalServerError } from '../../utils'
import { QueryScreenings } from './validationScheme'

const router = express.Router()

/**
 * query params for filtering (can filter by all or none)):
 * movieId: number - get all screenings for specific movie
 * screeningRoomId: number - get all screenings for specific screening room
 * fromDate: Date - get all screenings from specific date
 * skip: number - for infinite scroll implementation
 * take: number - for infinite scroll implementation
 */
router.get('/', validateQueryOnGetAll, async (req, res) => {
    try {
        const query = res.locals.queryScreenings as QueryScreenings
        const screenings = await getScreenings(query)
        res.send(screenings)
    } catch (error) {
        return internalServerError(error as Error, res)
    }
})

/**
 * get all available seats for specific screening
 * params:
 * id: number - screening id
 */
router.get('/:id/seats', async (req, res) => {
    try {
        const id = +req.params.id
        const seats = await getAvailableSeats(id)
        res.send(seats)
    } catch (error) {
        return internalServerError(error as Error, res)
    }
})


export default router