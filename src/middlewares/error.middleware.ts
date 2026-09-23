import { NextFunction, Request, Response } from 'express'
import {
    InvalidInput,
    NotFound,
    RuleViolation
} from '../errors'

export function errorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (error instanceof InvalidInput) {
        res.status(400).json({
            error: error.message,
            fields: error.fields
        })
        return
    }

    if (error instanceof NotFound) {
        res.status(404).json({
            error: error.message
        })
        return
    }

    if (error instanceof RuleViolation) {
        res.status(422).json({
            error: error.message
        })
        return
    }

    console.error(error)

    res.status(500).json({
        error: 'internal server error'
    })
}
