import z from 'zod'

export const queryScreeningsSchema = z.object({
    movieId: z.number().positive().optional(),
    screeningRoomId: z.number().positive().optional(),
    fromDate: z.date().optional(),
    // skip and take for infinite scroll implementation
    skip: z.number().optional().default(0),
    take: z.number().optional().default(10),
})

export type QueryScreenings = z.infer<typeof queryScreeningsSchema>



