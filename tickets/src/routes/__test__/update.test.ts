const request = require('supertest');
const { app } = require('../../app');
import mongoose from 'mongoose';

it('returns a 404 if provided id doesnt exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signUp())
        .send({
            title: 'ticket',
            price: 10
        })
        .expect(404)
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'ticket',
            price: 10
        })
        .expect(401)
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: 'title',
            price: 10
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signUp())
        .send({
            title: 'title1',
            price: 10
        })
        .expect(401)
});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signUp();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asdasdas',
            price: -10
        })
        .expect(400)


});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signUp();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 15
        })
        .expect(200)
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();
    
    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(15);
});