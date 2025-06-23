const request = require('supertest');
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
    const ticket = Ticket.build({
        title: 'ticket',
        price: 20
    });
    await ticket.save();

    const user = global.signUp();
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
});

it('throws an error if user tries to fetch anothers user order', async () => {
    const ticket = Ticket.build({
        title: 'ticket',
        price: 20
    });
    await ticket.save();

    const user = global.signUp();
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', global.signUp())
        .send()
        .expect(401);
});