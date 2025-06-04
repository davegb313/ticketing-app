import { app } from '../../app';
const request = require('supertest');

it('responds with details of current user', async () => {
    const cookie = await global.signUp();

    const userResponse = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(userResponse.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if there is no user', async () => {
    const userResponse = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(userResponse.body.currentUser).toEqual(null);
})