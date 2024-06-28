'use strict';

const { injuredWorkerView } = require('./injuredWorker');
const { captureNotes } = require('./captureNotes');
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
        view: injuredWorkerView

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
        view: carePlanView

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
  
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: captureNotes

        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
}

module.exports.register = (app) => {
    app.command('/view_injured_worker', injuredWorkerCommand);
    app.command('/view_care_plan', carePlanViewCommand);
    app.command('/capture_notes', captureNotesCommand);
};