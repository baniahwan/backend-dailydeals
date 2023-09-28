const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const db = require('./connection.js')
const response = require('./response.js')


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  next();
});
app.use(bodyParser.json())


app.get('/', (req, res) => {
  response(200, "Ini data", "ini message", res)
})

// Get all menu
app.get('/menu', (req, res) => {
  const sql = "SELECT * FROM menu"
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "menu get list", res)
  })
})

//Get menu by kategori
app.get('/menu/:kategori', (req, res) => {
  const kategori = req.params.kategori
  const sql = `SELECT * FROM menu WHERE kategori = "${kategori}"`
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "filter menu by kategori", res)
  })
})

// Get all user
app.get('/user', (req, res) => {
  const sql = "SELECT * FROM user"
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "user get list", res)
  })
})


// Post user
app.post('/user', (req, res) => {
  const { username, email, password } = req.body
  const sql = `INSERT INTO user (username, email, password) VALUES ("${username}", "${email}", "${password}")`
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res)
    if (fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertID,
      }
      response(200, data, "Data Added Succes", res)
    }
  })
})


app.put('/menu', (req, res) => {
  const { id, nama, deskripsi, harga, gambar, kategori } = req.body
  const sql = `UPDATE menu SET nama='${nama}', deskripsi='${deskripsi}', harga=${harga}, 
  gambar='${gambar}', kategori='${kategori}'`

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res)
    if (fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      }
      response(200, data, "Succes update menu", res)
    } else {
      response(404, "menu not found", "error", res)
    }
  })
})

app.delete('/menu', (req, res) => {
  const { id } = req.body
  const sql = `DELETE FROM menu WHERE id=${id}`
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res)
    if (fields?.affectedRows){
      const data = {
        isDeleted: fields.affectedRows,
      }
      response(200, data, "Deleted menu succes", res)
    } else {
      response(404, "menu not found", "error", res)
    }
  })
})

// app.get('/', (req, res) => {
//   const sql = "SELECT * FROM user"
//   db.query(sql, (error, result) => {
//     //hasil data dari mysql
//     response(200, result, "succesfully get all data from user", res)
//   })
// })

// app.get('/find', (req, res) => {
//   const sql = `SELECT * FROM user WHERE id = ${req.query.id}`
//   db.query(sql, (error, result)=> {
//     response(200, result, "find username", res)
//   })
// })

// app.post('/login',(req, res) => {
//     console.log({ requestFromOutside: req.body })
//     res.send('Login Berhasil!')
// })

// app.put('/username', (req, res) => {
//     console.log({ updateData: req.body })
//     res.send('update berhasil')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})