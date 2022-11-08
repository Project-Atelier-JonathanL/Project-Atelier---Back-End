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
      let lengths = result.rows.length <= 5 ? result.rows.length : 5
      for (let i = 0; i < lengths; i++) {
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
  let characteristics = {};
  db.query(`SELECT * from reviews WHERE product_id=${req.params.product_id}`)
    .then((result) => {
      console.log('works')
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
      console.log('two')
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
      console.log('tree')
      db.query(`SELECT * FROM characteristics WHERE product_id=${req.params.product_id}`)
        .then((charResult) => {
          const ids = []
          for (let k = 0; k < charResult.rows.length; k++) {
            ids.push(charResult.rows[k].id)
          }
          console.log(ids)
          if (ids[0]) {
            console.log('ids[0]')
            db.query(`SELECT * FROM characteristic_reviews WHERE characteristic_id=${ids[0]}`)
            .then(res_id => {
              let total = 0;
              for (let l = 0; l < res_id.rows.length; l++) {
                total += res_id.rows[l].value
              }
              let value = (total / res_id.rows.length)
              characteristics[charResult.rows[0].name] = {id: charResult.rows[0].id, value: value.toString()}
              if (ids.length === 1) {
                console.log('four')
                res.json({
                  product_id: req.params.product_id,
                  ratings: ratings,
                  recommended: recommend,
                  characteristics: characteristics
                })
              }
            })
          }
          if (ids[1]) {
            console.log('ids[0]')
            db.query(`SELECT * FROM characteristic_reviews WHERE characteristic_id=${ids[1]}`)
            .then(res_id => {
              let total = 0;
              for (let l = 0; l < res_id.rows.length; l++) {
                total += res_id.rows[l].value
              }
              let value = (total / res_id.rows.length)
              characteristics[charResult.rows[1].name] = {id: charResult.rows[1].id, value: value.toString()}
              if (ids.length === 2) {
                console.log('four')
                res.json({
                  product_id: req.params.product_id,
                  ratings: ratings,
                  recommended: recommend,
                  characteristics: characteristics
                })
              }
            })
          }
          if (ids[2]) {
            console.log('ids[0]')
            db.query(`SELECT * FROM characteristic_reviews WHERE characteristic_id=${ids[2]}`)
            .then(res_id => {
              let total = 0;
              for (let l = 0; l < res_id.rows.length; l++) {
                total += res_id.rows[l].value
              }
              let value = (total / res_id.rows.length)
              characteristics[charResult.rows[2].name] = {id: charResult.rows[2].id, value: value.toString()}
              if (ids.length === 3) {
                console.log('four')
                res.json({
                  product_id: req.params.product_id,
                  ratings: ratings,
                  recommended: recommend,
                  characteristics: characteristics
                })
              }
            })
          }
          if (ids[3]) {
            console.log('ids[0]')
            db.query(`SELECT * FROM characteristic_reviews WHERE characteristic_id=${ids[3]}`)
            .then(res_id => {
              let total = 0;
              for (let l = 0; l < res_id.rows.length; l++) {
                total += res_id.rows[l].value
              }
              let value = (total / res_id.rows.length)
              characteristics[charResult.rows[3].name] = {id: charResult.rows[3].id, value: value.toString()}
              if (ids.length === 4) {
                console.log('four')
                res.json({
                  product_id: req.params.product_id,
                  ratings: ratings,
                  recommended: recommend,
                  characteristics: characteristics
                })
              }
            })
          }

        })
        .catch(err => {
          console.log('it didnt work')
          res.status(500)
        })
    })
    .catch(err => console.log(err))

})

app.get('/testing' , (req, res) => {
  db.query(`SELECT * FROM reviews WHERE id=(SELECT max(id) FROM reviews)`)
    .then(result => res.send(result.rows))
})

app.post('/reviews', (req, res) => {
  console.log('req.body', req.body)
  let maxVal = 0;
  db.query(`SELECT * FROM reviews WHERE id=(SELECT max(id) FROM reviews)`)
  .then(result => {
      for (let i = 0; i < result.rows.length; i++) {
        console.log(result.rows[i].id)
        maxVal += result.rows[i].id
        maxVal += 1
      }
      console.log('THDSFJPIDSJ', maxVal)
      let date = new Date();
      // date = date.toString()
      db.query(`INSERT INTO reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
        VALUES (
          ${maxVal},
          ${req.body.product_id},
           ${req.body.rating},
           '${date}',
             '${req.body.summary}',
              '${req.body.body}',
               ${req.body.recommend},
               ${false},
                '${req.body.name}',
                 '${req.body.email}',
                  ${0}
                  ) RETURNING *`)
        .then(resst => res.json(resst.rows))
        .catch(err => console.log('error/....', err))
    })

})

app.put('/reviews/:review_id/helpful', (req, res) => {

})

app.put('/reviews/:review_id/report', (req, res) => {

})


app.listen(process.env.SERVER_PORT);
console.log(`Listening at http://localhost:${process.env.SERVER_PORT}`);