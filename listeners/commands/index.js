'use strict';

const { injuredWorkerView } = require('./injuredWorker');
const { captureNotes } = require('./captureNotes');
const { carePlanView } = require('./carePlanView');

module.exports.register = (app) => {
    app.command('/view_injured_worker', injuredWorkerView);
    app.command('/view_care_plan', carePlanView);
    app.command('/capture_notes', captureNotes);
};