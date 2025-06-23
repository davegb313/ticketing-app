const request = require('supertest');
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'ticket',
        price: 20
    });

    await ticket.save();

    return ticket;
}

it('gets a list of orders for particular user', async () => {
    const ticket1 = await buildTicket();
    const ticket2 = await buildTicket();
    const ticket3 = await buildTicket();

    const userOne = global.signUp();
    const userTwo = global.signUp();

    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticket1.id })
        .expect(201);

    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticket2.id })
        .expect(201);

    const { body: orderTwo } =  await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticket3.id })
        .expect(201);

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200)

    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.id);
});