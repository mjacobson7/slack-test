const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/load', (req, res) => {
  console.log('heyo')
  res.status(200).json('Server has loaded!')
})

app.post('/max-test', (req, res) => {
  console.log(req.body)
})

// app.use('/index.html', express.static(__dirname + '/index.html'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
})