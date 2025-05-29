import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequstValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('paassword must be between 4 and 20 characters')
], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequstValidationError(errors.array());
    }
    
    const { email, password } = req.body;
    
    throw new DatabaseConnectionError();
    console.log('creating user..')

    res.send({});
});

export { router as signupRouter };