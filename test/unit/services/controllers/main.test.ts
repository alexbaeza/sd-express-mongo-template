import request from 'supertest';
import { server, stopServer } from '../../../../src/server';
import TestDbHelper from '../../../test-db-helper';
import { expect } from '../../../test-utils';

const testDbHelper: TestDbHelper = new TestDbHelper();

/**
 * Creates 10 users in database and returns them as an array
 */
async function setUpExampleData() {

  return Promise.all([ ...Array(10).keys() ].map(async i => {
    const testName = `Alex${i}`;
    const testSurname = `Dev${i}`;

    const response = await request(server)
      .post('/item/')
      .send({ firstName: testName, surname: testSurname, type: 'Developer' })
      .expect(201);

    return response.body;
  }));
}

describe('main-controller', () => {

  let exampleData;
  before(async () => {
    await testDbHelper.start();
    exampleData = await setUpExampleData();
  });

  after(async () => {
    await stopServer();
    await testDbHelper.stop();
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {

      const response = await request(server)
        .get('/')
        .expect(200);

      expect(response.text).to.be.eq('Welcome to the Example Service REST');
    });
  });

  describe('GET /all', () => {
    it('should create a new item', async () => {

      const response = await request(server)
        .get('/all')
        .expect(200);

      expect(response.body).to.be.array();
      expect(response.body).to.be.ofSize(10);
    });
  });

  describe('POST /item', () => {
    it('should create a new item', async () => {

      const response = await request(server)
        .post('/item/')
        .send({ firstName: 'Alex', surname: 'Dev', type: 'Developer' })
        .expect(201);

      expect(response.body).to.haveOwnProperty('_id');
      expect(response.body).to.haveOwnProperty('firstName');
      expect(response.body.firstName).to.be.eq('Alex');
      expect(response.body).to.haveOwnProperty('surname');
      expect(response.body.surname).to.be.eq('Dev');
      expect(response.body).to.haveOwnProperty('type');
      expect(response.body.type).to.be.eq('Developer');
      expect(response.body).to.haveOwnProperty('__v');
    });
  });

  describe('GET /item/{id}', () => {
    it('should retrieve and item by id', async () => {

      const itemId = exampleData[0]._id;
      const response = await request(server)
        .get(`/item/${itemId}`)
        .expect(200);
      await expect(response.body).to.be.deep.eq(exampleData[0]);

    });
  });

  describe('PUT /item/{id}', () => {
    it('should update and item by id and returned changed item', async () => {

      const itemId = exampleData[0]._id;
      const response = await request(server)
        .put(`/item/${itemId}`)
        .send({ surname: 'newSurname' })
        .expect(200);

      expect(response.body).to.haveOwnProperty('_id');
      expect(response.body._id).to.be.eq(exampleData[0]._id);
      expect(response.body).to.haveOwnProperty('firstName');
      expect(response.body.firstName).to.be.eq(exampleData[0].firstName);
      expect(response.body).to.haveOwnProperty('surname');
      expect(response.body.surname).to.be.eq('newSurname');
      expect(response.body).to.haveOwnProperty('type');
      expect(response.body.type).to.be.eq(exampleData[0].type);
      expect(response.body).to.haveOwnProperty('__v');
      expect(response.body.__v).to.be.deep.eq(exampleData[0].__v);

    });
  });

  describe('DELETE /item/{id}', () => {
    it('should delete and item by id', async () => {

      const itemId = exampleData[0]._id;
      await request(server)
        .delete(`/item/${itemId}`)
        .expect(204);
    });
  });

});
