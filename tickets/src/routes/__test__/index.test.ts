import request from 'supertest';
const { app } = require('../../app');

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: 'sdfgdfg',
            price: 10,
        })
        .expect(201);
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)

    expect(response.body.length).toEqual(3);
});