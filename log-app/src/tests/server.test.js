const request = require('supertest');
const app = require('../../../log-app-backend/server');

describe('Server API Endpoints', () => {
    afterAll(done => {
        //Closing the server to end tests
        app.close(done);
    });

    it('should login successfully with valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'johnDoe',
                password: 'hello'
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user.username).toBe('johnDoe');
    });

    it('should not login with invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'invalidUser',
                password: 'invalidPass'
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});