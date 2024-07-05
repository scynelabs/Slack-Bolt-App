'use strict';
const { travelRequestRejected } = require('../../user-interface/modals');
const { queryCaseDetail  } = require('../../salesforce/query/cases');
const {
    refreshUIAfterStatusChange
} = require('../utils/approve-reject-callbacks');

const appHomeRejectRequestCallback = async ({ body, ack, client, context }) => {
    try {
        await ack();
        if (context.hasAuthorized) {
            try {
                // Reject travel request
                const requestId = body.actions[0].value;
                // await rejectTravelRequest(
                //     context.sfconnection,
                //     travelRequestId
                // );
                const data = await queryCaseDetail(
                        context.sfconnection,
                        requestId
                    );
                // Trigger a Success Modal
                // await client.views.open({
                //     trigger_id: body.trigger_id,
                //     view: travelRequestRejected()
                // });
                console.log('Case Data ==>', JSON.stringify(data))
                // Delete message or refresh home tab
                // refreshUIAfterStatusChange(body, client, context);
            } catch (e) {
                throw e;
            }
        } else {
            /*
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: shortcut.trigger_id,
                view: authorizeSalesforcePrompt(
                    context.teamId,
                    botInfo.bot.app_id
                )
            });
            */
           console.log('SF dis-connection, please authorize')
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { appHomeRejectRequestCallback };

