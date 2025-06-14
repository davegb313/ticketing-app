import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to db');

    } catch (err) {
        console.error(err)
    }

    app.listen(3000, () => {
        console.log('listening on 3000!');
    });
}

start();