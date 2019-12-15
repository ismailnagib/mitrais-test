/* global before after */
const supertest = require('supertest');
const { assert } = require('chai');
const app = require('../app/server');

const server = supertest(app);

const dataTest = {};

before((done) => {
  // TODO: Seed Data
  done();
});

require('./ping.test')(server, assert, dataTest);

after(async () => {
  try {
    // TODO: Delete After Test
  } catch (error) {
    throw error;
  }
});
