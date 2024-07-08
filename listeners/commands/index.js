'use strict';

const { caseDetailsView } = require('./caseDetail');
const { injuredWorkerView } = require('./injuredWorker');
const { captureNotesView } = require('./captureNotes');
const { carePlanView } = require('./carePlan');
const { claimsView } = require('./claims');
const { channel } = require('slack-block-builder');
const { 
    queryAllCases,
    queryCaseDetail, 
    queryCaseCarePlans,
    queryCaseInjuredWorker,
    queryClaims
} = require('../../salesforce/query/cases');
const {
    authorizeSalesforcePrompt,
} = require('../../user-interface/modals');


const viewCaseDetailsCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {

        if(context.hasAuthorized){
            const caseId = getCaseId(body)
            const data = await queryCaseDetail(
                context.sfconnection,
                caseId
            );  
            console.log('case data ==>', caseId)
            logger.info(data)
            say(await caseDetailsView(data))

            // const { user_id, channel_id } = body;

            // const { blocks } = await caseDetailsView(data)
            // await client.chat.postEphemeral({
            //     channel: channel_id,
            //     user: user_id,
            //     blocks 
            // });

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
            const caseId = getCaseId(body)
            const data = await queryCaseInjuredWorker(
                context.sfconnection,
                caseId
            );  
            console.log('case data ==>', caseId)
            say(await injuredWorkerView(data))
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
        console.log('case data ==>', caseId)
        if(context.hasAuthorized){
            // console.log('capture notes view ==>', JSON.stringify(captureNotesView))

            const caseId = getCaseId(body)
            const data = await queryCaseCarePlans(
                context.sfconnection,
                caseId
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

const claimsViewCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {
        // console.log('middleware context ==>', context)

        if(context.hasAuthorized){
            // console.log('capture notes view ==>', JSON.stringify(captureNotesView))

            const caseId = getCaseId(body)
            const data = await queryClaims(
                context.sfconnection,
                caseId
            );
            console.log('case data ==>', caseId)
            const cpView = await claimsView(data)
            console.log('Claims View ==>', JSON.stringify(cpView))
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

const captureNotesCommand = async ({ ack, say, body, client, logger, context }) => {

    console.log('capture notes view ==>')
    // Acknowledge the command request
    await ack();

    try {
        // console.log('middleware context ==>', context)

        // console.log('Client info ==>')
        // logger.info(client)

        // console.log('Body info ==>')
        // logger.info(body)

        if(context.hasAuthorized){
            console.log('capture notes view ==>', JSON.stringify(captureNotesView))

            // console.time("fetch");
            // await fetchData( { body, context, logger})
            // console.timeEnd("fetch");

            await say(captureNotesView)
           
            // // Call views.open with the built-in client
            // const result = await client.views.open({
            //       // Pass a valid trigger_id within 3 seconds of receiving it
            //       trigger_id: body.trigger_id,
            //       // View payload
            //       view: captureNotesView         
            //   });
            //   logger.info(result);
              
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

function getCaseId(body){
    //channel_name
    if(body && body.channel_name){
        const regexp = /swarm-case-([\w\d]+)/g;
        const str = body.channel_name

        const matchingResult = [...str.matchAll(regexp)];
        if(matchingResult && matchingResult.length > 0){
            return matchingResult[0][1]
        }
    }
    return null
}

module.exports.register = (app) => {
    app.command('/view_case', viewCaseDetailsCommand);
    app.command('/view_injured_worker', injuredWorkerCommand);
    app.command('/view_care_plan', carePlanViewCommand);
    app.command('/view_claims', claimsViewCommand);
    app.command('/capture_notes', captureNotesCommand);

    app.event("message", messageHandler);
};