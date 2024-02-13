import app, {server} from '../../server.js';
import supertest from "supertest";
import {expect} from 'chai';
import sequelize from '../../database/database_connection.js';
import {User} from '../../models/index.js';


// Setup app for testing
const request = supertest(app);

// Test data
const userDetails = {
    "username": "testuser@example.com",
    "password": "testpassword",
    "first_name": "test",
    "last_name": "user"
}
before(async () => {
    await User.destroy({where:{username: userDetails.username}});
});
describe("User API Integration Test", () => {

    // Test 1: Create a new user
    it("Should return 201 status code for successful user creation", async () => {
        const resp = await request.post('/v1/user')
                                  .send(userDetails);
        console.log(`response: ${resp}`);
        expect(resp.status).to.equal(201);
    });

    // Test 2: Get a user
    it("Should return 200 status code for successful user retrieval", async () => {
        const resp = await request.get('/v1/user/self')
                                  .auth(userDetails.username, userDetails.password);
        console.log(`response: ${resp}`);
        expect(resp.status).to.equal(200);
    });

    // Test 3: Update a user
    it("Should return 204 status code for successful user update", async () => {
        const resp = await request.put('/v1/user/self')
                                  .auth(userDetails.username, userDetails.password)
                                  .send({ "first_name": "updated" });
        console.log(`response: ${resp}`);
        expect(resp.status).to.equal(204);
    });

    // Test 4: Get a user
    it("Should return 200 status code for successful user retrieval", async () => {
        const resp = await request.get('/v1/user/self')
                                  .auth(userDetails.username, userDetails.password);
        console.log(`response: ${resp}`);
        expect(resp.status).to.equal(200);
        expect(resp.body.first_name).to.equal("updated");
    });

});

// Clean up

after(async () => {

    await User.destroy({where:{username: userDetails.username}});
    await sequelize.close();
    server.close();


});