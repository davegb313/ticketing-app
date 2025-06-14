import { app } from '../../app';
const request = require('supertest');

it('returns 201 on successful sigmup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testsfdf',
            password: 'password'
        })
        .expect(400);
});

it('returns 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testsfdf',
            password: 'pas'
        })
        .expect(400);
});

it('returns 400 with password or email missing', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com' })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('allows only unique emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})