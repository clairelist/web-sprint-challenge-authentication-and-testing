// Write your tests here
/* eslint-disable */
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwtDecode = require('jwt-decode');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test('sanity', () => {
  expect(true).toBe(true);
});

describe('the daddio server',()=>{
  it('can register a daddy (POST to /api/auth/register)', async () => {
    await request(server).post('/api/auth/register').send({ username: 'daddy', password: '1234' });
    const daddy = await db('users').where('username', 'daddy').first();
    expect(daddy).toMatchObject({username: 'daddy'});
  });

  it('papi can log IN and generates correct success response (POST to /api/auth/login', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'daddy', password: '1234' })
      expect(res.body.message).toMatch(/welcome, daddy/i)
    }, 750); //currently broken !
  
  it('throws correct error on bad login infos (POST to /api/auth/login', async () => {
   const res = await request(server).post('/api/auth/login').send({username: 'mama mia', password: 'xxxyyyzzz'});
    expect(res.body.message).toMatch('invalid credentials');
  });

  it('can throw a daddy temper tantrum when registering a null username (POST to /api/auth/register)', async () =>{
    const res = await request(server).post('/api/auth/register').send({password: 'blah'});
    expect(res.body.message).toMatch('username and password required');
  })

  });



