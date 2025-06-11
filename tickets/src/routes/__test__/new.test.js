const request = require('supertest');
const { app } = require('../../app');
const { Ticket } = require('../../models/ticket');

it('has a route handler for /api/tickets with a post request', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status other than 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: 'asldkjf',
      price: -10,
    })
    .expect(400);
});

it('creates a valid ticket ', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: 'sdfgdfg',
      price: 10,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);

});