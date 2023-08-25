import z from 'zod'

export const createBookingScheme = z.object({
    userId: z.number().positive(),
    screeningId: z.number().positive(),
    seatInRoomId: z.number().positive(),
    price: z.number().positive()
})

export type CreateBookingInput = z.infer<typeof createBookingScheme>
