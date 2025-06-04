import { app } from '../../app';
const request = require('supertest');

it('fails with an email that does not exist', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'testasdasd@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails with a password is incorrect', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongPass'
        })
        .expect(400);
});

it('responds with a cookie when given valid creds', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});