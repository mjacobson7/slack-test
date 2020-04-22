const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_AUTH_TOKEN;
const web = new WebClient(token);
const app = express();


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/load', (req, res) => {
  res.status(200).json('Server has loaded!')
})

app.post('/slack-recognize', async (req, res) => {
  try {

    const { trigger_id: triggerId } = req.body;

    res.status(200).send('');

    // Open a modal.
    await web.views.open({
      trigger_id: triggerId,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Recognize",
          emoji: true
        },
        submit: {
          type: "plain_text",
          text: "Next",
          emoji: true
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Who do you want to recognize today?"
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "users_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select a user",
                  emoji: true
                }
              }
            ]
          }
        ]
      },
    });

  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }

})


app.post('/slack-user', async (req, res) => {
  try {
    console.log('We did it!')
  } catch(e) {
    console.log(e)
  }
})








app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
})