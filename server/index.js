require("dotenv").config();
const express = require("express");
const path = require("path");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

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
  db.query('SELECT * FROM reviews WHERE id=1')
    .then(result => res.send(result.rows))
    .catch(err => console.log(err))
})

// Product_id ONLY
app.get('/reviews/product_id/:product_id', (req, res) => {
  console.log(req.params)
  db.query(`SELECT * FROM reviews WHERE product_id=${req.params.product_id}`)
    .then(result => {
      const arr = [];
      for (let i = 0; i < 5; i++) {
        let row = result.rows[i]
        arr.push({
          "review_id": row.id,
          "rating": row.rating,
          "summary": row.summary,
          "recommend": row.recommend,
          "response": row.response,
          "body": row.body,
          "date": row.date,
          "reviewer_name": row.reviewer_name,
          "helpfulness": row.helpfulness,
          "photos": []
        })
      }
      res.json({
        "product": req.params.product_id,
        "page": 0,
        "count": 5,
        "results": arr
      })
     })
    .catch(err => console.log(err))
})

// Product_id && COUNT ONLY
app.get('/reviews/product_id/:product_id/count/:count', (req, res) => {
  console.log(req.params)
  let photos;
  let photosArr = []
  const arr = [];
  // for (let j = 0; j < photosArr.length; j++) {
  //   db.query(`SELECT * FROM reviews_photos WHERE review_id=${row.id}`)
  //     .then(result => photosArr.push(result))
  // }
  db.query(`SELECT * FROM reviews WHERE product_id=${req.params.product_id}`)
    .then(result => {
      for (let i = 0; i < req.params.count; i++) {
        let row = result.rows[i]
        if (!row) {
          break;
        }
        photosArr.push(row.id)
        // let photos;
        arr.push({
          "review_id": row.id,
          "rating": row.rating,
          "summary": row.summary,
          "recommend": row.recommend,
          "response": row.response,
          "body": row.body,
          "date": row.date,
          "reviewer_name": row.reviewer_name,
          "helpfulness": row.helpfulness,
          "photos": []
        })
        console.log(photosArr)
      }
      res.json({
        "product": req.params.product_id,
        "page": 0,
        "count": req.params.count,
        "results": arr
      })
     })
    .catch(err => console.log(err))
})

// META ? PRODUCT_ID
app.get('/reviews/meta/product_id/:product_id', (req, res) => {
  console.log(req.params)
  let ratings = {}
  let recommend = {'false': '0', 'true': '0'}
  db.query(`SELECT * from reviews WHERE product_id=${req.params.product_id}`)
    .then(result => {
      for (let i = 0; i < result.rows.length; i++) {
        let row = result.rows[i]
        if (!ratings[row.rating]) {
          ratings[row.rating] = '1'
        } else {
          ratings[row.rating] = Number(ratings[row.rating])
          ratings[row.rating]++
          ratings[row.rating] = ratings[row.rating].toString()
        }
      }
      for (let j = 0; j < result.rows.length; j++) {
        let row = result.rows[j]
        if (row.recommend === true) {
          recommend.true = Number(recommend.true) + 1
          recommend.true = recommend.true.toString()
        } else {
          recommend.false = Number(recommend.false) + 1
          recommend.false = recommend.false.toString()
        }
      }
      res.json({
        product_id: req.params.product_id,
        ratings: ratings,
        recommended: recommend,
        characteristics: {}
      })
    })
    // db.query('')
})

app.put('/reviews/:review_id/helpful', (req, res) => {

})

app.put('/reviews/:review_id/report', (req, res) => {

})


app.listen(process.env.SERVER_PORT);
console.log(`Listening at http://localhost:${process.env.SERVER_PORT}`);