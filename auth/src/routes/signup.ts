import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@daviegb/ticketing-common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('paassword must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in Use')
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };