require("dotenv").config();
const { Client } = require('pg')

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})

client.connect()

client.query('CREATE TABLE IF NOT EXISTS reviews (id SERIAL PRIMARY KEY, product_id INT, rating INT, date TEXT, summary VARCHAR(255), body VARCHAR(1000),recommend BOOLEAN, reported BOOLEAN, reviewer_name VARCHAR(255), reviewer_email TEXT, response TEXT, helpfulness INT)',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res.rows)
    }
})
client.query('CREATE TABLE IF NOT EXISTS reviews_photos (id SERIAL PRIMARY KEY, review_id INT, url VARCHAR(255))',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res.rows)
    }
})
client.query('CREATE TABLE IF NOT EXISTS characteristics (id SERIAL PRIMARY KEY, product_id INT, name VARCHAR(255))',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res.rows)
    }
})

client.query('CREATE TABLE IF NOT EXISTS characteristic_reviews (id SERIAL PRIMARY KEY, characteristic_id INT, review_id INT, value INT)',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res.rows)
    }
})
// \copy characteristic_reviews from '../../../../Users/jonathanliang/Desktop/SDCdata/characteristic_reviews.csv' csv header;
client.query('SELECT * FROM reviews_photos WHERE id=123',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res.rows)
    }
    client.end()
})

module.exports = client;