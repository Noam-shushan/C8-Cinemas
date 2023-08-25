import { Screenings, SeatBookings, SeatsInRoom } from './db'
import { QueryScreenings } from '../routes/screenings/validationScheme'


export async function isScreeningValid(screeningId: number) {
    const screening = await Screenings()
        .select('*')
        .where({ 'isDeleted': false })
        .andWhere('date', '>', new Date())
        .andWhere('id', '=', screeningId)
        .first()

    return screening ? true : false;
}

export async function getScreenings(params: QueryScreenings) {
    const screenings =
        await Screenings()
            .select('*')
            .where('isDeleted', false)
            .andWhere(builder => {
                if (params.movieId) {
                    builder.andWhere('movieId', '=', params.movieId)
                }
                if (params.screeningRoomId) {
                    builder.andWhere('screeningRoomId', '=', params.screeningRoomId)
                }
            })
            .andWhere('date', '>', params.fromDate ?? new Date())
            .limit(params.take)
            .offset(params.skip)

    return screenings
}

export async function getAvailableSeats(screeningId: number) {
    const screeningRoom = await Screenings()
        .select('screeningRoomId')
        .where('isDeleted', false)
        .andWhere('id', '=', screeningId)
        .first()

    if (!screeningRoom) {
        throw new Error('Screening not found')
    }

    const notAvailableSeats = await SeatBookings()
        .select('seatInRoomId')
        .where('isDeleted', false)
        .andWhere('screeningId', '=', screeningId)
        .andWhere(builder => {
            builder.where('status', '=', 'reserved')
                .orWhere('status', '=', 'paid')
        })

    const freeSeats = await SeatsInRoom()
        .select('*')
        .where('isDeleted', false)
        .andWhere('screeningRoomId', '=', screeningRoom.screeningRoomId)
        .andWhere(builder => {
            builder.whereNotIn('id', notAvailableSeats.map(s => s.seatInRoomId))
        })

    return freeSeats
}
