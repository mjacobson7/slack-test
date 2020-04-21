const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
const app = express();


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/load', (req, res) => {
  res.status(200).json('Server has loaded!')
})

app.post('/max-test', async (req, res) => {
  try {
    console.log(req.body)
    // const payload = JSON.parse(req.body.payload)
    // console.log(payload.callback_id)

    console.log('heyo')

    const response = await axios.get('https://slack.com/api/users.list?token=' + process.env.SLACK_AUTH_TOKEN)
    const users = response.data.members;
    const options = [];
    
    users.map(user => {
      if (!user.deleted && !user.is_bot && user.real_name != 'Slackbot') {
        options.push({
          text: user.real_name,
          value: user.id
        })
      }
    })
    
    
    const responseObj = {
      text: "Who would you like to recognize?",
      attachments: [
        {
          color: "#3AA3E3",
          attachment_type: "default",
          callback_id: "user_selection",
          actions: [
            {
              name: "users_list",
              text: "Select a user",
              type: "select",
              options: options
            }
          ]
        }
      ]
    }

    res.status(200).json(responseObj)
      
    } catch(e) {
      console.log(e)
      res.status(500).send(e)
    }
      
})








app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
})