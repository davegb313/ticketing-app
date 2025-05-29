import type { ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors()})
        return
    }

    res.status(400).send({ errors: [{ message: err.message }] })
}