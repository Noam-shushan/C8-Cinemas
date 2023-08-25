import { Request, Response, NextFunction } from 'express'
import { queryScreeningsSchema, QueryScreenings } from './validationScheme'
import { ZodError } from 'zod'

export function validateQueryOnGetAll(
    req: Request<{}, {}, {}, any>,
    res: Response, next: NextFunction) {
    try {
        const fixedQuery =
        {
            movieId: req.query.movieId ? parseInt(req.query.movieId) : undefined,
            screeningRoomId: req.query.screeningRoomId ? parseInt(req.query.screeningRoomId) : undefined,
            fromDate: req.query.fromDate ? new Date(req.query.fromDate) : undefined,
            skip: req.query.skip ? parseInt(req.query.skip) : undefined,
            take: req.query.take ? parseInt(req.query.take) : undefined,
        }
        const input = queryScreeningsSchema.parse(fixedQuery);
        res.locals.queryScreenings = input as QueryScreenings
        next()
    } catch (error: ZodError | unknown) {
        res.status(400).send({ error: (error as ZodError).errors, errorCode: 'input_validation' });
    }
}