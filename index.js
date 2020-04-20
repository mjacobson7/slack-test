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
  res.status(200).json(
    {
      "trigger_id": "13345224609.738474920.8088930838d88f008e0",
      "dialog": {
        "callback_id": "ryde-46e2b0",
        "title": "Request a Ride",
        "submit_label": "Request",
        "notify_on_cancel": true,
        "state": "Limo",
        "elements": [
            {
                "type": "text",
                "label": "Pickup Location",
                "name": "loc_origin"
            },
            {
                "type": "text",
                "label": "Dropoff Location",
                "name": "loc_destination"
            }
        ]
      }
    })

// app.use('/index.html', express.static(__dirname + '/index.html'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
})