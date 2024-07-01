'use strict';

const { injuredWorkerView } = require('./injuredWorker');
const { captureNotesView } = require('./captureNotes');
const { carePlanView } = require('./carePlan');


const injuredWorkerCommand = async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
  
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {...injuredWorkerView}

        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
}

const carePlanViewCommand = async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
  
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {...carePlanView}

        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
}

const captureNotesCommand = async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
    console.log('capture notes view ==>', JSON.stringify(captureNotesView))
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: captureNotesView         
        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
}


const messageHandler = async ({ message, ack, body, say, event, payload }) => {
  console.log('message event payload', payload)

  /*
  { user: 'U079T1163ML',
  type: 'message',
  ts: '1719793726.359189',
  client_msg_id: '29e31091-3b0d-4d27-8061-f2c5ff966297',
  text: 'message payload test',
  team: 'T07ANDG2X6C',
  blocks:
   [ { type: 'rich_text', block_id: 'mLY6j', elements: [Array] } ],
  channel: 'C079ZGA2GJF',
  event_ts: '1719793726.359189',
  channel_type: 'channel' }
  */

  const { text } = payload

  if(text.indexOf(':face_with_head_bandage:')){
    // show injured worker details
    injuredWorkerCommand({
        ack,
        body,
        client,
        logger
    })
  }
  else if(text.indexOf(':innocent')){
    // show care plan
    carePlanViewCommand({
        ack,
        body,
        client,
        logger
    })
  }else if(text.indexOf(':white_check_mark:')){
    // show swarming completed
    say('swarming will be closed.')
  }
}

module.exports.register = (app) => {
    app.command('/view_injured_worker', injuredWorkerCommand);
    app.command('/view_care_plan', carePlanViewCommand);
    app.command('/capture_notes', captureNotesCommand);

    // app.event("message", messageHandler);
};