import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequstValidationError extends CustomError {
    statusCode = 400;
    reason = 'Error connecting to database';
    constructor(public errors: ValidationError[]) {
        super('invalid request parameters');

        // for built in class extending purposes
        Object.setPrototypeOf(this, RequstValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        })
    }
}