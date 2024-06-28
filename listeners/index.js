'use strict';

const shortcutsListener = require('./shortcuts');
const eventsListener = require('./events');
const actionListener = require('./actions');
const commandsListener = require('./commands');

module.exports.registerListeners = (app) => {
    shortcutsListener.register(app);
    eventsListener.register(app);
    actionListener.register(app);
    commandsListener.register(app);
};
