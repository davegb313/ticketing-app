import request from 'supertest';
const { app } = require('../../app');
import mongoose from 'mongoose';

it('return a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('returns a ticket if its found', async () => {
    const title = 'concert';
    const price = 10;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title, price,
        })
        .expect(201);
        
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);
    
    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});