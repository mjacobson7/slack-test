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
  console.log('heyo')
  res.status(200).json('Server has loaded!')
})

app.post('/max-test', async (req, res) => {
  console.log(req.body)
  
  try {
    const response = await axios.get('https://slack.com/api/users.list?token=' + process.env.SLACK_AUTH_TOKEN)
    const users = response.data.members;
    const options = [];
    
    users.map(user => {
      if (!user.deleted && !user.is_bot) {
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
          text: "Select a user",
          fallback: "If you could read this message, you'd be choosing something fun to do right now.",
          color: "#3AA3E3",
          attachment_type: "default",
          callback_id: "game_selection",
          actions: [
            {
              name: "games_list",
              text: "Pick a game...",
              type: "select",
              options: JSON.stringify(options)
            }
          ]
        }
      ]
    }

    const jsonResponse = JSON.stringify(responseObj);

    res.status(200).json(jsonResponse)


    
    // res.status(200).json(
      
      
    //   {
    //     "text": "Who would you like to recognize?",
    //     "attachments": [
    //       {
    //         "text": "Select a user",
    //         "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
    //         "color": "#3AA3E3",
    //         "attachment_type": "default",
    //         "callback_id": "game_selection",
    //         "actions": [
    //           {
    //             "name": "games_list",
    //             "text": "Pick a game...",
    //             "type": "select",
    //             "options": optionsString
    //           }
    //         ]
    //       }
    //     ]
    //   }
      
      
    //   )
      
    } catch(e) {
      console.log(e)
      res.status(500).send(e)
    }
      
      // const data = {form: {
        //   token: process.env.SLACK_AUTH_TOKEN,
        //   channel: '#test',
        //   text: "Hi! :wave: \n I'm your new bot."
        // }}
        
        // axios.post('https://slack.com/api/chat.postMessage', data).then(response => {
          //   console.log(response);
          
          //   res.status(200).json(response.data)
          // })
          
          
          // axios.get('https://slack.com/api/users.identity', data).then(res => {
  //   console.log(res.data)
  // })

  // res.status(200).json(
  //   {
  //     "channel": "C1H9RESGL",
  //     "blocks": [
  //       {
  //         "type": "section",
  //         "text": {
  //           "type": "mrkdwn",
  //           "text": "Who would you like to recognize?"
  //         }
  //       },
  //       {
  //         "type": "section",
  //         "block_id": "section567",
  //         "text": {
  //           "type": "mrkdwn",
  //           "text": "<https://google.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
  //         },
  //         "accessory": {
  //           "type": "image",
  //           "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
  //           "alt_text": "Haunted hotel image"
  //         }
  //       },
  //       {
  //         "type": "section",
  //         "block_id": "section789",
  //         "fields": [
  //           {
  //             "type": "mrkdwn",
  //             "text": "*Average Rating*\n1.0"
  //           }
  //         ]
  //       },
  //       {
  //         "type": "actions",
  //         "elements": [
  //           {
  //             "type": "button",
  //             "text": {
  //               "type": "plain_text",
  //               "text": "Reply to review",
  //               "emoji": false
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // )



})

// app.use('/index.html', express.static(__dirname + '/index.html'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
})