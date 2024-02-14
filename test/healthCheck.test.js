import {expect} from 'chai';
import supertest from 'supertest';
import app, {server} from '../server.js';
import {sequelize, createDatabase} from '../database/database_connection.js';


let request;
before(async () => {
    // Create database if not exists
    await createDatabase();

    // Sync Sequelize models
    await sequelize.sync();

    // Initialize supertest request
    request = supertest(app);
});

describe('Health Check API', () => {

  it('should return 200 OK for a successful health check', async () => {
    const response = await request.get('/healthz');

    // Assert the HTTP status code is 200 OK
    expect(response.status).to.equal(200);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  it('should return 503 Service Unavailable for a failed health check', async () => {

    // Simulate a failure by setting the Simulate-Failure header to true
    const response = await request.get('/healthz')
      .set('Simulate-Failure', 'true');

    // Assert the HTTP status code is 503 Service Unavailable
    expect(response.status).to.equal(503);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  it('should return 400 Bad Request for a request with a body', async () => {
    const response = await request.get('/healthz')
      .send({
        "foo": "bar"
      });

    // Assert the HTTP status code is 400 Bad Request
    expect(response.status).to.equal(400);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  it('should return 400 Bad Request for a request with a query string', async () => {
    const response = await request.get('/healthz?foo=bar');

    // Assert the HTTP status code is 400 Bad Request
    expect(response.status).to.equal(400);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  // post method not allowed test
  it('should return 405 Method Not Allowed for a POST request', async () => {
    const response = await request.post('/healthz');

    // Assert the HTTP status code is 405 Method Not Allowed
    expect(response.status).to.equal(405);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  // put method not allowed test
  it('should return 405 Method Not Allowed for a PUT request', async () => {
    const response = await request.put('/healthz');

    // Assert the HTTP status code is 405 Method Not Allowed
    expect(response.status).to.equal(405);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  // delete method not allowed test
  it('should return 405 Method Not Allowed for a DELETE request', async () => {
    const response = await request.delete('/healthz');

    // Assert the HTTP status code is 405 Method Not Allowed
    expect(response.status).to.equal(405);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

  // patch method not allowed test
  it('should return 405 Method Not Allowed for a PATCH request', async () => {
    const response = await request.patch('/healthz');

    // Assert the HTTP status code is 405 Method Not Allowed
    expect(response.status).to.equal(405);

    // Assert the headers
    expect(response.headers).to.have.property('cache-control', 'no-cache');

    // Assert the response body is empty
    expect(response.body).to.be.empty;
  });

});


after(() =>{
  server.close();
})