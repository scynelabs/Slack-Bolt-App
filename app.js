const express = require('express');
const session = require('express-session');
const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
const config = require('./config/config');
const { registerListeners } = require('./listeners');
const { registerCustomRoutes } = require('./routes');
const persistedClient = require('./store/bolt-web-client');
const { authWithSalesforce } = require('./middleware/salesforce-auth');

let logLevel;
switch (process.env.LOG_LEVEL) {
    case 'debug':
        logLevel = LogLevel.DEBUG;
        break;
    case 'info':
        logLevel = LogLevel.INFO;
        break;
    case 'warn':
        logLevel = LogLevel.WARN;
        break;
    case 'error':
        logLevel = LogLevel.ERROR;
        break;
    default:
        logLevel = LogLevel.INFO;
}

// Create custom express app to be able to use express-session middleware
const app = express();
app.use(
    session({
        secret: config.salesforce.clientSecret,
        resave: true,
        saveUninitialized: true
    })
);

// Use custom ExpressReceiver to be able to use express-session middleware
const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    app
});

// Initializes your app with your bot token and signing secret
const boltApp = new App({
    ...config.slack,
    logLevel,
    receiver
});

// boltApp.shortcut('who_am_i', async ({ shortcut, ack, client, logger }) => {

//   try {
//     // Acknowledge shortcut request
//     await ack();

//     // Call the views.open method using one of the built-in WebClients
//     const result = await client.views.open({
//       trigger_id: shortcut.trigger_id,
//       view: {
//         type: "modal",
//         title: {
//           type: "plain_text",
//           text: "My App"
//         },
//         close: {
//           type: "plain_text",
//           text: "Close"
//         },
//         blocks: [
//           {
//             type: "section",
//             text: {
//               type: "mrkdwn",
//               text: "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
//             }
//           },
//           {
//             type: "context",
//             elements: [
//               {
//                 type: "mrkdwn",
//                 text: "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
//               }
//             ]
//           }
//         ]
//       }
//     });

//     logger.info(result);
//   }
//   catch (error) {
//     logger.error(error);
//   }
// });

// Defining ExpressReceiver custom routes
receiver.router.use(express.json());
registerCustomRoutes().forEach((route) => {
    const method = route.method[0].toLowerCase();
    receiver.router[method](route.path, route.handler);
});

// Register Listeners
registerListeners(boltApp);

// Assign Slack WebClient
persistedClient.client = boltApp.client;

// Use global middleware to fetch Salesforce Authentication details
boltApp.use(authWithSalesforce);

// // Listen for a slash command invocation
// boltApp.command("/helloworld", async ({ ack, payload, context }) => {
//     console.log("/helloworld listening on.");
//     // Acknowledge the command request
//     ack();
  
//     try {
//       const result = await boltApp.client.chat.postMessage({
//         token: context.botToken,
//         // Channel to send message to
//         channel: payload.channel_id,
//         // Include a button in the message (or whatever blocks you want!)
//         blocks: [
//           {
//             type: "section",
//             text: {
//               type: "mrkdwn",
//               text: "Go ahead. Click it.",
//             },
//             accessory: {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: "Click me!",
//               },
//               action_id: "button_abc",
//             },
//           },
//         ],
//         // Text in the notification
//         text: "Message from Test App",
//       });
//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   });
//   // All the room in the world for your code

// boltApp.command('/capture_notes', async ({ ack, body, context }) => {
//     // Acknowledge the command request
//     await ack();
  
//     try {
//       const result = await boltApp.client.views.open({
//         token: context.botToken,
//         // Pass a valid trigger_id within 3 seconds of receiving it
//         trigger_id: body.trigger_id,
//         // View payload
//         view: {
//             "type": "modal",
//             "submit": {
//                 "type": "plain_text",
//                 "text": "Submit",
//                 "emoji": true
//             },
//             "close": {
//                 "type": "plain_text",
//                 "text": "Cancel",
//                 "emoji": true
//             },
//             "title": {
//                 "type": "plain_text",
//                 "text": "Your Care Plan",
//                 "emoji": true
//             },
//             "blocks": [
//                 {
//                     "type": "header",
//                     "text": {
//                         "type": "plain_text",
//                         "text": "You're all set with your care plan."
//                     }
//                 },
//                 {
//                     "type": "divider"
//                 },
//                 {
//                     "type": "section",
//                     "fields": [
//                         {
//                             "type": "mrkdwn",
//                             "text": "*Contact*\nKatie Chen"
//                         },
//                         {
//                             "type": "mrkdwn",
//                             "text": "*Date*\nOct 22-23"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "context",
//                     "elements": [
//                         {
//                             "type": "mrkdwn",
//                             "text": ":house: Accommodation"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "divider"
//                 },
//                 {
//                     "type": "section",
//                     "text": {
//                         "type": "mrkdwn",
//                         "text": "*Redwood Suite*\n*Share with 2 other person.* Studio home. Modern bathroom. TV. Heating. Full kitchen. Patio with lounge chairs and campfire style fire pit and grill."
//                     },
//                     "accessory": {
//                         "type": "image",
//                         "image_url": "https://api.slack.com/img/blocks/bkb_template_images/redwood-suite.png",
//                         "alt_text": "Redwood Suite"
//                     }
//                 },
//                 {
//                     "type": "context",
//                     "elements": [
//                         {
//                             "type": "mrkdwn",
//                             "text": ":fork_and_knife: Food & Dietary restrictions"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "divider"
//                 },
//                 {
//                     "type": "section",
//                     "text": {
//                         "type": "mrkdwn",
//                         "text": "*All-rounder*\nYou eat most meats, seafood, dairy and vegetables."
//                     }
//                 },
//                 {
//                     "type": "context",
//                     "elements": [
//                         {
//                             "type": "mrkdwn",
//                             "text": ":woman-running: Activities"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "divider"
//                 },
//                 {
//                     "type": "section",
//                     "text": {
//                         "type": "mrkdwn",
//                         "text": "*Winery tour and tasting*"
//                     },
//                     "fields": [
//                         {
//                             "type": "plain_text",
//                             "text": "Wednesday, Oct 22 2019, 2pm-5pm",
//                             "emoji": true
//                         },
//                         {
//                             "type": "plain_text",
//                             "text": "Hosted by Sandra Mullens",
//                             "emoji": true
//                         }
//                     ]
//                 },
//                 {
//                     "type": "section",
//                     "text": {
//                         "type": "mrkdwn",
//                         "text": "*Sunrise hike to Mount Amazing*"
//                     },
//                     "fields": [
//                         {
//                             "type": "plain_text",
//                             "text": "Thursday, Oct 23 2019, 5:30am",
//                             "emoji": true
//                         },
//                         {
//                             "type": "plain_text",
//                             "text": "Hosted by Jordan Smith",
//                             "emoji": true
//                         }
//                     ]
//                 },
//                 {
//                     "type": "section",
//                     "text": {
//                         "type": "mrkdwn",
//                         "text": "*Design systems brainstorm*"
//                     },
//                     "fields": [
//                         {
//                             "type": "plain_text",
//                             "text": "Thursday, Oct 23 2019, 11a",
//                             "emoji": true
//                         },
//                         {
//                             "type": "plain_text",
//                             "text": "Hosted by Mary Lee",
//                             "emoji": true
//                         }
//                     ]
//                 }
//             ]
//         } 
//       });
//       console.log(result);
//     }
//     catch (error) {
//       console.error(error);
//     }
//   });

 // Asynchronous function to start the app
(async () => {
    try {
        // Start your app
        await boltApp.start(process.env.PORT || 3000);
        console.log(
            `⚡️ Bolt app is running on port ${process.env.PORT || 3000}!`
        );
    } catch (error) {
        console.error('Unable to start App', error);
        process.exit(1);
    }
})();
