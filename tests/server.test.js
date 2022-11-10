const { Pool } = require('pg');
const axios = require('axios');
require("dotenv").config();

const API_URL = `http://localhost:${process.env.SERVER_PORT}`;


const reviews_meta_body = {
  "product_id": 123,
  "rating": 4,
  "summary": "herfeef",
  "body": "herergfdodspsdfoijsdfojsdofijsodifjoisdf",
  "recommend": true,
  "name": "JOn",
  "email": "jonathanliang@gmail.com"
};


jest.setTimeout(20000);

describe('SDC R&R services', () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  })

  beforeAll(() => {
    console.log('before all...');
  });

  test('Should get back status 200 and check if results is an Array', async () => {

    const { data, status } = await axios.get(`${API_URL}/reviews/product_id/1/`);

    expect(status).toEqual(200);
    expect(Array.isArray(data.results)).toEqual(true)

  });

  test('should send a post request', async () => {

    const results = await axios.post(`${API_URL}/reviews/`, reviews_meta_body);
    // console.log('post', results)
    expect(results.status).toEqual(201);
    expect(results.config.method).toEqual('post')
    expect(Array.isArray(results.data)).toEqual(true)

  });

  test('Should get back Meta data', async () => {

    const result = await axios.get(`${API_URL}/reviews/meta/product_id/1/`);
    console.log(result)
    // expect(status).toEqual(200);
    // expect(Array.isArray(data.results)).toEqual(true)

  });


  test('Should increase helpfulness count by 1', async () => {

    const results = await axios.put(`${API_URL}/reviews/1/helpful`);
    // console.log(results)
    expect(results.status).toEqual(200);
    expect(results.config.method).toEqual('put')

  });

  test('Should change reported to true', async () => {

    const results = await axios.put(`${API_URL}/reviews/1/report`);
    console.log(results)
    expect(results.status).toEqual(200);
    expect(results.config.method).toEqual('put')

  });
})