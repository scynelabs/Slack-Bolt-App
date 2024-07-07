'use strict';

const { caseDetailsView } = require('./caseDetail');
const { injuredWorkerView } = require('./injuredWorker');
const { captureNotesView } = require('./captureNotes');
const { carePlanView } = require('./carePlan');
const { channel } = require('slack-block-builder');
const { 
    queryAllCases,
    queryCaseDetail, 
    queryCaseCarePlans,
    queryCaseInjuredWorker
} = require('../../salesforce/query/cases');
const {
    authorizeSalesforcePrompt,
} = require('../../user-interface/modals');


const viewCaseDetailsCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {

        if(context.hasAuthorized){
            const requestId = ''
            const data = await queryCaseDetail(
                context.sfconnection,
                requestId
            );  
            console.log('case data ==>')
            logger.info(data)
            say(await caseDetailsView(data))

        }else {
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: body.trigger_id,
                view: authorizeSalesforcePrompt(
                    context.teamId,
                    botInfo.bot.app_id
                )
            });  
        }        
        /*     
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {...injuredWorkerView}

        });
        logger.info(result);
        */
    }
    catch (error) {
        logger.error(error);
    }
}

const injuredWorkerCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {
        if(context.hasAuthorized){
            const requestId = ''
            const data = await queryCaseInjuredWorker(
                context.sfconnection,
                requestId
            );  
            
            say(await injuredWorkerCommand(data))
            /*
        // Call views.open with the built-in client
        const result = await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {...injuredWorkerView}

            });
            logger.info(result);
            */

        }else {
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: body.trigger_id,
                view: authorizeSalesforcePrompt(
                    context.teamId,
                    botInfo.bot.app_id
                )
            });            
        }
    }
    catch (error) {
        logger.error(error);
    }
}

const carePlanViewCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {
        // console.log('middleware context ==>', context)

        if(context.hasAuthorized){
            // console.log('capture notes view ==>', JSON.stringify(captureNotesView))

            const requestId = ''
            const data = await queryCaseCarePlans(
                context.sfconnection,
                requestId
            );

            const cpView = await carePlanView(data)
            console.log('Care Plans View ==>', JSON.stringify(cpView))
            say(cpView)
            // say(await carePlanView(data))

        }else {
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: body.trigger_id,
                view: authorizeSalesforcePrompt(
                    context.teamId,
                    botInfo.bot.app_id
                )
            });            
        }
        /*
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {...carePlanView}

        });
        logger.info(result);
        */
    }
    catch (error) {
        logger.error(error);
    }
}

const captureNotesCommand = async ({ ack, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
    try {
        // console.log('middleware context ==>', context)

        if(context.hasAuthorized){
            console.log('capture notes view ==>', JSON.stringify(captureNotesView))

            // console.time("fetch");
            // await fetchData( { body, context, logger})
            // console.timeEnd("fetch");

            // await say(carePlanView)
           
            // Call views.open with the built-in client
            const result = await client.views.open({
                  // Pass a valid trigger_id within 3 seconds of receiving it
                  trigger_id: body.trigger_id,
                  // View payload
                  view: captureNotesView         
              });
              logger.info(result);
              
        }else{
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: body.trigger_id,
                view: authorizeSalesforcePrompt(
                    context.teamId,
                    botInfo.bot.app_id
                )
            });
        }
        
    }
    catch (error) {
        logger.error(error);
    }
}


const messageHandler = async ({ client, body, say, event, payload, logger }) => {

    const { text } = payload

    console.log('message event payload text', text, payload)
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

  if(text.indexOf(':face_with_head_bandage:') != -1){
    // show injured worker details
    await say(injuredWorkerView)
  }
  
  else if(text.indexOf(':innocent') != -1){
    // show care plan
    await say(carePlanView)

  }else if(text.indexOf(':white_check_mark:') != -1){
    // show swarming completed
    await say('swarming will be closed.')
  }
}

module.exports.register = (app) => {
    app.command('/view_case', viewCaseDetailsCommand);
    app.command('/view_injured_worker', injuredWorkerCommand);
    app.command('/view_care_plan', carePlanViewCommand);
    app.command('/capture_notes', captureNotesCommand);

    // app.event("message", messageHandler);
};