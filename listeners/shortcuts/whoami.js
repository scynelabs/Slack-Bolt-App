'use strict';

const {
    whoAmIResponse,
    authorize_sf_prompt
} = require('../../user-interface/modals');

const whoamiCallback = async ({ shortcut, ack, client, context }) => {
    try {
        await ack();

        console.log('shortcut ==> ', {shortcut, context})
        if (context.hasAuthorized) {
            const conn = context.sfconnection;
            const currentuser = await conn.identity();
            // Call the views.open method using one of the built-in WebClients
            const whoamiBlocksView = whoAmIResponse(conn.instanceUrl, currentuser.username)
            console.log('whoamiBlocksView ==>', whoamiBlocksView)

            await client.views.open({
                trigger_id: shortcut.trigger_id,
                view: whoamiBlocksView//whoAmIResponse(conn.instanceUrl, currentuser.username)
            });
        } else {
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: shortcut.trigger_id,
                view: authorize_sf_prompt(context.teamId, botInfo.bot.app_id)
            });
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

const whoamiCallback2 =  async ({ shortcut, ack, client, logger }) => {

    try {
      // Acknowledge shortcut request
      await ack();
  
      // Call the views.open method using one of the built-in WebClients
      const result = await client.views.open({
        trigger_id: shortcut.trigger_id,
        view: {
          type: "modal",
          title: {
            type: "plain_text",
            text: "My App"
          },
          close: {
            type: "plain_text",
            text: "Close"
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
              }
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      });
  
      logger.info(result);
    }
    catch (error) {
      logger.error(error);
    }
}

module.exports = { whoamiCallback: whoamiCallback2 };
