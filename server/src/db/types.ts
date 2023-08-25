export type BaseEntity = {
    id: number
    isDeleted: boolean
    created_at: Date
    updated_at: Date
}

export type ScreeningRoom = BaseEntity & {
    name: string
    seats?: SeatInRoom[]
    screenings?: Screening[]
}

export type Movie = BaseEntity & {
    title: string
    description: string
    duration: number
    image: string
    screenings?: Screening[]
}

export type SeatInRoom = {
    id: number
    screeningRoomId: number // foreign key to screeningRoom
    rowNumber: number
    seat: number
}

export type Screening = BaseEntity & {
    screeningRoomId: number // foreign key to screeningRoom
    movieId: number // foreign key to movie
    date: Date // date and time of screening
    screeningRoom?: ScreeningRoom // optional on get full screening
    movie?: Movie // optional on get full screening
}

export type BookingStatus = 'reserved' | 'paid' | 'cancelled'

export type SeatBooking = BaseEntity & {
    price: number
    status: BookingStatus
    userId: number // foreign key to user
    screeningId: number // foreign key to screening
    seatInRoomId: number // foreign key to seatInRoom
    screening?: Screening
    seat?: SeatInRoom
}

export type ScreeningJoinResult = BaseEntity & {
    screeningRoomId: number
    movieId: number
    date: Date
    movieCreatedAt: Date
    movieUpdatedAt: Date
    movieIsDeleted: boolean
    screeningRoomCreatedAt: Date
    screeningRoomUpdatedAt: Date
    screeningRoomIsDeleted: boolean
    title: string
    description: string
    duration: number
    image: string
    name: string
    seats: number
    rows: number
}


