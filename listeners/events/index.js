'use strict';

const { appHomeOpenedCallback } = require('./app-home-opened');

module.exports.register = (app) => {
    app.event('app_home_opened', appHomeOpenedCallback);
    app.event('file_shared', async ({ client, event, payload, body, context, logger }) => {
        console.log('file_shared event ==>');

        console.log('file_shared event: payload ==>');
        logger.info(payload)

        // console.log('file_shared event: event ==>');
        // logger.info(event)

        // console.log('file_shared event: body ==>');
        // logger.info(body)        
    });
};
