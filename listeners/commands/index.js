'use strict';

const { caseDetailsView } = require('./caseDetail');
const { injuredWorkerView } = require('./injuredWorker');
const { captureNotesView } = require('./captureNotes');
const { carePlanView } = require('./carePlan');
const { claimsView } = require('./claims');
const { allCaseActionsView } = require('./allCaseActions');

const { 
    queryAllCases,
    queryCaseDetail, 
    queryCaseCarePlans,
    queryCaseInjuredWorker,
    queryClaims,
    closwSwarm
} = require('../../salesforce/query/cases');
const {
    authorizeSalesforcePrompt,
} = require('../../user-interface/modals');



const viewCaseDetailsCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();

    try {

        console.log('body ==>')
        logger.info(body)

        if(context.hasAuthorized){
            const caseId = getCaseId(body)
            const data = await queryCaseDetail(
                context.sfconnection,
                caseId
            );  
            console.log('case data ==>', caseId)
            logger.info(data)

            // say(await caseDetailsView(data))
            const { user_id, channel_id } = body;

            const { blocks } = await caseDetailsView(data, context.sfconnection?.instanceUrl)
            const result = await client.chat.postEphemeral({
                channel: channel_id,
                user: user_id,
                blocks 
            });

            console.log('/view_case result')
            logger.info(result)
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
           
      // Call views.open with the built-in client
    //   const result = await client.views.open({
    //     // Pass a valid trigger_id within 3 seconds of receiving it
    //     trigger_id: body.trigger_id,
    //     // View payload
    //     view: {...injuredWorkerView}

    //     });
    //     logger.info(result);
        
    }
    catch (error) {
        logger.error(error);
    }
    
}

const injuredWorkerCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();

    console.log('injuredWorkerCommand ==>')
    logger.info(body)
  
    try {
        if(context.hasAuthorized){
            const caseId = getCaseId(body)
            const data = await queryCaseInjuredWorker(
                context.sfconnection,
                caseId
            );  
            console.log('case data ==>', caseId)
            // say(await injuredWorkerView(data))
            const { user_id, channel_id } = body;

            const { blocks } = await injuredWorkerView(data, context.sfconnection?.instanceUrl)
            const result = await client.chat.postEphemeral({
                channel: channel_id,
                user: user_id,
                blocks,
                text: 'Case details ' + caseId
            });
            
            console.log('/view_injured_worker result')
            logger.info(result)
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

            const caseId = getCaseId(body)
            const data = await queryCaseCarePlans(
                context.sfconnection,
                caseId
            );

            // const cpView = await carePlanView(data)
            // console.log('Care Plans View ==>', JSON.stringify(cpView))
            // say(cpView)
            const { user_id, channel_id } = body;

            const { blocks } = await carePlanView(data, context.sfconnection?.instanceUrl)
            const result = await client.chat.postEphemeral({
                channel: channel_id,
                user: user_id,
                blocks,
                text: 'Care Plan details '
            });

            console.log('/view_care_plan result')
            logger.info(result)
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
            // const cpView = await claimsView(data)
            // console.log('Claims View ==>', JSON.stringify(cpView))
            // say(cpView)
            const { user_id, channel_id } = body;

            const { blocks } = await claimsView(data, context.sfconnection?.instanceUrl)
            const result = await client.chat.postEphemeral({
                channel: channel_id,
                user: user_id,
                blocks,
                text: 'Claims details '
            });
            console.log('/view_claims result')
            logger.info(result)
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

const allCaseActionsCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {
        // console.log('middleware context ==>', context)

        if(context.hasAuthorized){
            // console.log('capture notes view ==>', JSON.stringify(captureNotesView))

            // const caseId = getCaseId(body)
            // const data = await queryClaims(
            //     context.sfconnection,
            //     caseId
            // );
            // console.log('case data ==>', caseId)
            // const cpView = await claimsView(data)
            // console.log('Claims View ==>', JSON.stringify(cpView))
            // say(cpView)
            console.log('body ==>')
            logger.info(body)

            const { user_id, channel_id } = body;

            const { blocks } = await allCaseActionsView()
            const result = await client.chat.postEphemeral({
                channel: channel_id,
                user: user_id,
                blocks,
                text: 'All Case actions '
            });
            console.log('/all_actions result')
            logger.info(result)
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

        console.log('captureNotesCommand Body info ==>')
        logger.info(body)

        const { user_id, channel_id } = body;

        if(context.hasAuthorized){
            console.log('capture notes view ==>', JSON.stringify(captureNotesView({channel_name: body.channel_name, user_id, channel_id })))

            // console.time("fetch");
            // await fetchData( { body, context, logger})
            // console.timeEnd("fetch");

            // await say(captureNotesView)
           
            // Call views.open with the built-in client
            const result = await client.views.open({
                  // Pass a valid trigger_id within 3 seconds of receiving it
                  trigger_id: body.trigger_id,
                  // View payload
                  view: captureNotesView({channel_name: body.channel_name, user_id, channel_id })         
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

const closeSwarmCommand = async ({ ack, say, body, client, logger, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {
        // console.log('middleware context ==>', context)

        if(context.hasAuthorized){

            console.log('body ==>')
            logger.info(body)

            const { user_id, channel_id } = body;

            // const { blocks } = await allCaseActionsView()
            const caseNumber = getCaseId(body)
            await closwSwarm(
                context.sfconnection,
                caseNumber
            )
    
            // await say("Closing the swarm :white_check_mark:")
            const result = await client.chat.postMessage({
                channel: channel_id,
                user: user_id,
                text: 'Closing the swarm :white_check_mark:'
            });

            console.log('Result ==>')
            logger.info(result)

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


const messageHandler = async ({ ack, client, body, say, event, payload, logger, context }) => {

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

    body.user_id = body.user.id;
    body.channel_id = body.channel.id
    const blankPromise = () => new Promise(resolve => resolve())

    if(text.indexOf(':face_with_head_bandage:') != -1){
        // show injured worker details
        // await say(injuredWorkerView)
        // await injuredWorkerCommand({ack, say, body, client, logger, event, context})        
        await injuredWorkerCommand({ack: ack || blankPromise, say: say, body, client, logger, event, context})
    }
    
    else if(text.indexOf(':innocent') != -1){
        // show care plan
        // await say(carePlanView)
        await carePlanViewCommand({ack: blankPromise, say, body, client, logger, event, context})

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


// const buttonClickAction = async ({ ack, say, body, client, logger, event }) => {
//     // Acknowledge action request
//     await ack();
//     console.log('Action evnet data')
//     logger.info(event)
//     logger.info(body)
//     //   await say('Button clicked');

//     // const { user_id, channel_id } = body;

//     const result = await client.chat.postEphemeral({
//         channel: body.channel.id,
//         user: body.user.id,
//         text: 'Button action event '
//     });
// }

module.exports.register = (app) => {
    app.command('/view_case', viewCaseDetailsCommand);
    app.command('/view_injured_worker', injuredWorkerCommand);
    app.command('/view_care_plan', carePlanViewCommand);
    app.command('/view_claims', claimsViewCommand);
    app.command('/close_swarm', closeSwarmCommand);
    app.command('/capture_notes', captureNotesCommand);
    app.command('/all_actions', allCaseActionsCommand)

    app.event("message", messageHandler);

    app.action('view_case', async ({ ack, say, body, client, logger, event, context }) => {
        body.user_id = body.user.id
        body.channel_id = body.channel.id
        body.channel_name = body.channel.name
        await viewCaseDetailsCommand({ack, say, body, client, logger, event, context})
    });
    app.action('view_injured_worker', async ({ ack, say, body, client, logger, event, context }) => {
        body.user_id = body.user.id
        body.channel_id = body.channel.id
        body.channel_name = body.channel.name
        await injuredWorkerCommand({ack, say, body, client, logger, event, context})
    });
    app.action('view_care_plan', async ({ ack, say, body, client, logger, event, context }) => {
        body.user_id = body.user.id
        body.channel_id = body.channel.id
        body.channel_name = body.channel.name
        await carePlanViewCommand({ack, say, body, client, logger, event, context})
    });
    app.action('view_claims', async ({ ack, say, body, client, logger, event, context }) => {
        body.user_id = body.user.id
        body.channel_id = body.channel.id
        body.channel_name = body.channel.name
        await claimsViewCommand({ack, say, body, client, logger, event, context})
    });
    app.action('capture_notes', async ({ ack, say, body, client, logger, event, context }) => {
        body.user_id = body.user.id
        body.channel_id = body.channel.id
        body.channel_name = body.channel.name
        await captureNotesCommand({ack, say, body, client, logger, event, context})
    });
    app.action('finish_case_swarm', async ({ ack, say, body, client, logger, event, context }) => {

        // await ack()

        body.user_id = body.user.id
        body.channel_id = body.channel.id
        body.channel_name = body.channel.name
        console.log('Close swarm')
        await closeSwarmCommand({ack, say, body, client, logger, event, context})

    });

};