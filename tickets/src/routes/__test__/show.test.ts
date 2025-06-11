const request = require('supertest');
const { app } = require('../../app');
const { Ticket } = require('../../models/ticket');

it('return a 404 if the ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/sdfsdfs')
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
    
        console.log(response.body);
        
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);
    
    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});