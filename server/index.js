require("dotenv").config();
const express = require("express");
const path = require("path");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
// app.use(sessionHandler);

// // Logs the time, session_id, method, and url of incoming requests.
// app.use(logger);

// Serves up all static and generated assets in ../client/dist.
// app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json())

app.get('/test', (req, res) => {
  db.query('SELECT * FROM reviews WHERE id=1', (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })
})

app.get('/', (req, res) => {
  console.log('hello')
  res.send("hi")
})

app.get('/reviews/meta', (req, res) => {

})

app.get('/reviews', (req, res) => {
  db.query('SELECT * FROM reviews WHERE id=1', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json(result.rows)
    }
  })
})

app.post('reviews', (req, res) => {

})

app.put('/reviews/:review_id/helpful', (req, res) => {

})

app.put('/reviews/:review_id/report', (req, res) => {

})


app.listen(process.env.SERVER_PORT);
console.log(`Listening at http://localhost:${process.env.SERVER_PORT}`);