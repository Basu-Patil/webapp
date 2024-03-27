import app, { server } from '../../server.js';
import supertest from "supertest";
import { expect } from 'chai';
import {sequelize, createDatabase} from '../../database/database_connection.js';
import { User } from '../../models/index.js';


// Setup app for testing
// Setup app for testing
let request;
before(async () => {
    // Create database if not exists
    await createDatabase();

    // Sync Sequelize models
    await sequelize.sync();

    // Initialize supertest request
    request = supertest(app);

    await User.destroy({ where: { username: userDetails.username } });
});

// Test data
const userDetails = {
    "username": "testuser@example.com",
    "password": "testpassword",
    "first_name": "test",
    "last_name": "user",
}

const updatedUserDetails = {
    "username": "testuser2@example.com",
    "password": "testpassword",
    "first_name": "test",
    "last_name": "user"
}

describe("Success User API Integration Test", () => {

    // Test 1: Create a new user
    it("Should return 201 status code for successful user creation", async () => {
        const resp = await request.post('/v1/user')
            .send(userDetails);
        
        expect(resp.status).to.equal(201);
        const user = await User.update({ email_verified: true, account_verified: true },
                                        { where: { username: userDetails.username } });
    });

    // Test 2: Get a user
    it("Should return 200 status code for successful user retrieval", async () => {
        const resp = await request.get('/v1/user/self')
            .auth(userDetails.username, userDetails.password);
        
        expect(resp.status).to.equal(200);
    });

    // Test 3: Update a user
    it("Should return 204 status code for successful user update", async () => {
        const resp = await request.put('/v1/user/self')
            .auth(userDetails.username, userDetails.password)
            .send({ "first_name": "updated" });
        
        expect(resp.status).to.equal(204);
    });

    // Test 4: Get a user
    it("Should return 200 status code for successful user retrieval", async () => {
        const resp = await request.get('/v1/user/self')
            .auth(userDetails.username, userDetails.password);
        
        expect(resp.status).to.equal(200);
        expect(resp.body.first_name).to.equal("updated");
    });

});

describe("Failure User API Integration Test", () => {
    // Test 1: Bad Request for creating a user with same username
    it("Should return 400  status code for creating duplicate user", async () => {
        const resp = await request.post('/v1/user')
            .send(userDetails);
        
        expect(resp.status).to.equal(400);
    });

    // Test 2: unauthorized access
    it("Should return 401 status code for unauthorized access", async () => {
        const resp = await request.get('/v1/user/self')
                                  .auth(userDetails.username, "wrongpassword");
        
        expect(resp.status).to.equal(401);
    });

    // Test 3: Bad Request for updating a username
    it("Should return 400 status code for updating username", async () => {
        const resp = await request.put('/v1/user/self')
            .auth(userDetails.username, userDetails.password)
            .send(updatedUserDetails);

        expect(resp.status).to.equal(400);

    });


});

// Clean up

after(async () => {

    await User.destroy({ where: { username: userDetails.username } });
    server.close();
    await sequelize.close();

});