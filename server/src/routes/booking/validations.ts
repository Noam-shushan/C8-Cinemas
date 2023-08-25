import { Request, Response, NextFunction } from 'express'
import { CreateBookingInput, createBookingScheme } from './validationScheme'
import { ZodError } from 'zod'

export function validateOnCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const input = createBookingScheme.parse(req.body)
        res.locals.createBookingInput = input as CreateBookingInput
        next()
    } catch (error: ZodError | unknown) {
        res.status(400).send({ error: (error as ZodError).errors });
    }
}