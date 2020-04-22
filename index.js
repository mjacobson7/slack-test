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

app.post('/max-test', async (req, res) => {
  try {



    const { trigger_id: triggerId } = req.body;

    res.status(200).send('');

    // Open a modal.
    await web.views.open({
      trigger_id: triggerId,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Who do you want to recognize today?',
        },
        submit: {
          type: 'plain_text',
          text: 'Next',
        },
        callback_id: 'frontdesk',
        blocks: [
          // {
          //   type: 'section',
          //   text: {
          //     type: 'plain_text',
          //     text: ':wave: We will get back to you as soon as possible',
          //     emoji: true,
          //   },
          // },
          {
            type: 'divider',
          },

          {
            type: 'input',
            block_id: 'title',
            label: {
              type: 'plain_text',
              text: 'Title',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              multiline: false,
              action_id: 'title',
            },
          },
          {
            type: 'input',
            block_id: 'description',
            label: {
              type: 'plain_text',
              text: 'Description',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'description',
            },
            optional: true,
          },
        ],
      },
    });


    // console.log(req.body)
    // if (req.body.payload) {
    //   const payload = JSON.parse(req.body.payload)
    //   console.log(payload.callback_id)

    //   if(payload.callback_id == 'user_selection') {
    //     const responseObj = {
    //       text: "Choose a program",
    //       attachments: [
    //         {
    //           color: "#3AA3E3",
    //           attachment_type: "default",
    //           callback_id: "program_selection",
    //           actions: [
    //             {
    //               name: "program_list",
    //               text: "Select a Program",
    //               type: "select",
    //               options: [
    //                 {
    //                   text: 'Anniversary Program',
    //                   value: 'ANNIVERSARY'
    //                 },
    //                 {
    //                   text: 'Happy Birthday',
    //                   value: 'BIRTHDAY'
    //                 },
    //                 {
    //                   text: 'High Five',
    //                   value: 'HF'
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }

    //     res.status(200).json(responseObj)

    //   }




    // } else {
    //   const response = await axios.get('https://slack.com/api/users.list?token=' + process.env.SLACK_AUTH_TOKEN)
    //   const users = response.data.members;
    //   const options = [];

    //   users.map(user => {
    //     if (!user.deleted && !user.is_bot && user.real_name != 'Slackbot') {
    //       options.push({
    //         text: user.real_name,
    //         value: user.id
    //       })
    //     }
    //   })


    //   const responseObj = {
    //     text: "Who would you like to recognize?",
    //     attachments: [
    //       {
    //         color: "#3AA3E3",
    //         attachment_type: "default",
    //         callback_id: "user_selection",
    //         actions: [
    //           {
    //             name: "users_list",
    //             text: "Select a user",
    //             type: "select",
    //             options: options
    //           }
    //         ]
    //       }
    //     ]
    //   }

    //   res.status(200).json(responseObj)
    // }

  } catch (e) {
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