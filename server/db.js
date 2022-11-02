const { Client } = require('pg')

const client = new Client({
  user: 'jonathanliang',
  host: 'localhost',
  database: 'sdc_reviews',
  password: 'rootuser',
  port: 5432
})

client.connect()

client.query('CREATE TABLE IF NOT EXISTS reviews (review_id SERIAL PRIMARY KEY, product_id INT, rating INT, summary VARCHAR(255), recommend BOOLEAN, response TEXT, body VARCHAR(255), date TEXT, reported BOOLEAN, reviewer_name VARCHAR(255), reviewer_email TEXT)',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res)
    }
    client.end()
})

client.query('CREATE TABLE IF NOT EXISTS reviews_photos (id SERIAL PRIMARY KEY)',
  (err, res) => {
    if (err) {
      console.log(err.messages)
    } else {
      console.log(res)
    }
    client.end()
})