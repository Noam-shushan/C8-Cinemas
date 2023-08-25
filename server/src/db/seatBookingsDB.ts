import { SeatBookings, SeatsInRoom } from './db'
import { CreateBookingInput } from '../routes/booking/validationScheme'
import { SeatBooking } from './types'

export async function isSeatExist(seatInRoomId: number) {
    const seat = await SeatsInRoom()
        .select('*')
        .where('isDeleted', false)
        .andWhere('id', '=', seatInRoomId)
        .first()

    return seat ? true : false;
}

export async function GetSeatBookingStatus(screeningId: number, seatInRoomId: number) {
    const seatBookings = await SeatBookings()
        .select('*')
        .where('isDeleted', false)
        .andWhere('screeningId', '=', screeningId)
        .andWhere('seatInRoomId', '=', seatInRoomId)
        .first()

    return { status: seatBookings?.status, id: seatBookings?.id }
}

export async function createBooking(input: CreateBookingInput) {
    const seatBookin = await SeatBookings()
        .insert({
            userId: input.userId,
            screeningId: input.screeningId,
            seatInRoomId: input.seatInRoomId,
            price: input.price,
            status: 'reserved'
        })
        .returning('*')
    return seatBookin[0]
}

export async function updateBooking(seatBookingId: number, props?: Partial<SeatBooking>) {
    if (!props) {
        return null
    }
    const seatBookinId = await SeatBookings()
        .update(props)
        .where('id', '=', seatBookingId)
        .returning('*')

    return seatBookinId[0]
}



