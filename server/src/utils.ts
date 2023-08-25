import { Response } from "express";

export function internalServerError(error: Error, res: Response) {
    console.error(error)
    return res.status(500).send({ error: (error as Error).message, errorCode: 'internal_server_error' })
}