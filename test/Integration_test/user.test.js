import supertest from 'supertest';
import app from '../../server.js';
import { expect } from "chai";
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

describe('User Integration Testing', () => {
    // Test case to create an account
    describe('Create an account', () => {
        it('should return 201 status code', async () => {
            const res = await request
                .post('/v1/user')
                .send({
                    "first_name": "Basavaraj",
                    "last_name": "Patil",
                    "password": "Password",
                    "username": "patilbasavaraj298@gmail.com"
                });
            expect(res.status).to.equal(201);
        });
    });

    // Test case to validate account
    describe('Validate account', () => {
        it('should return 200 status code', async () => {
            const res = await request
                .get('/v1/user/self/')
                .auth("patilbasavaraj298@gmail.com", "Password");
                console.log(`\n\n create get Response JSOn: ${JSON.stringify(res)}\n\n`);
            console.log(`status: ${res.status}`);
            expect(res.status).to.equal(200);
        });
    });

    // Test case to update an account
    describe('Update an account', () => {
        it('should return 200 status code', async () => {
            const res = await request
                .put('/v1/user/self')
                .auth("patilbasavaraj298@gmail.com", "Password")
                .send({
                    "first_name": "Basu",
                    "last_name": "P",
                    "password": "random"
                });
            console.log(`\n\nupdate response: ${JSON.stringify(res)}\n\n`);
            console.log(`status: ${res.status}`);
            expect(res.data.username).to.equal("patilbasavaraj298@gmail.com");
        });

        // Validation of account update
        describe('Validate account', () => {
            it('should return 200 status code', async () => {
                const res = await request
                    .get('/v1/user/self/')
                    .auth("patilbasavaraj298@gmail.com", "Password");
                    console.log(`update get resp : ${JSON.stringify(res)}`);
                    console.log(`status: ${res.status}`);
                    expect(res.data.first_name).to.equal("Basu");
                    expect(res.status).to.equal(200);
            });
        });
    });
});