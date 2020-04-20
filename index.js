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
      "channel": "C1H9RESGL",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Danny Torrence left the following review for your property:"
          }
        },
        {
          "type": "section",
          "block_id": "section567",
          "text": {
            "type": "mrkdwn",
            "text": "<https://google.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
            "alt_text": "Haunted hotel image"
          }
        },
        {
          "type": "section",
          "block_id": "section789",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Average Rating*\n1.0"
            }
          ]
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Reply to review",
                "emoji": false
              }
            }
          ]
        }
      ]
    }
  )
})

// app.use('/index.html', express.static(__dirname + '/index.html'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
})