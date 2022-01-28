// Write your tests here
/* eslint-disable */
const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')
const bcrypt = require('bcryptjs')
const jwtDecode = require('jwt-decode')

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
beforeEach(async () => {
  await db.seed.run();
})
afterAll(async () => {
  await db.destroy();
})
test('sanity', () => {
  expect(true).toBe(true);
})


