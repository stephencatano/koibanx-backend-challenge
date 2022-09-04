const request = require('supertest');
const { assert } = require('chai');
const { OK, BAD_REQUEST } = require('http-status');

const app = require('../../app');

const path = '/api/stores/';
const storeToCreate = require('../resources/store.json')

describe('Functional Testing', () => {
  it('Create & Get Stores Success', async () => {
    process.env.NODE_ENV = 'testing';

    const responseCreateStore = await request(app)
      .post(`${path}`)
      .set('Authorization', 'Basic XXX')
      .send(storeToCreate);

    assert.equal(responseCreateStore.status, OK, 'Response Create Store is OK');
    assert.isUndefined(responseCreateStore.body.errors, 'Errors on responseCreateStore is Undefined')
    assert.isDefined(responseCreateStore.body._id, '_id is Defined');
    assert.equal(responseCreateStore.body.name, storeToCreate.name, 'Name is OK');

    const responseGetStores = await request(app)
      .get(`${path}`)
      .set('Authorization', 'Basic XXX');

    assert.equal(responseGetStores.status, OK, 'Response Get Stores is OK');
    assert.isUndefined(responseGetStores.body.errors, 'Errors on responseGetStores is Undefined')
    assert.isArray(responseGetStores.body.data, 'Data is An Array');
    assert.isTrue(responseGetStores.body.data.length > 0, 'Data is not Empty');

    const responseGetStoresWithQuery = await request(app)
      .get(`${path}`)
      .query({ q: { "name" : {"$in" : [ "Test Create Store On Tests" ] } } })
      .set('Authorization', 'Basic XXX');

    assert.equal(responseGetStoresWithQuery.status, OK, 'Response Get Stores is OK');
    assert.isUndefined(responseGetStoresWithQuery.body.errors, 'Errors on responseGetStoresWithQuery is Undefined')
    assert.isDefined(responseGetStoresWithQuery.body.data[0].id, '_id is Defined');
    assert.equal(responseGetStoresWithQuery.body.data[0].currentBalance, '$100,000.00', 'Current Balance is Decorated');
    assert.equal(responseGetStoresWithQuery.body.data[0].active, 'Sí', 'Active is Decorated');
    assert.equal(responseGetStoresWithQuery.body.data[0].lastSale, 'Friday, September 2, 2022', 'Last Sale is Decorated');
  }).timeout(0);

  it('Create & Get Stores Failed', async () => {
    process.env.NODE_ENV = 'testing';

    const responseCreateStore = await request(app)
      .post(`${path}`)
      .set('Authorization', 'Basic XXX')
      .send({});

    assert.equal(responseCreateStore.status, BAD_REQUEST, 'Response Create Store is Failed');
    assert.isDefined(responseCreateStore.body.errors, 'Errors on responseCreateStore is Defined');

    process.env.NODE_ENV = 'other';
    const responseGetStores = await request(app)
      .get(`${path}`);

      assert.equal(responseGetStores.status, BAD_REQUEST, 'Response Get Stores is Failed');
      assert.isDefined(responseGetStores.body.errors, 'Errors on responseGetStores is Defined');
  }).timeout(0);
});
