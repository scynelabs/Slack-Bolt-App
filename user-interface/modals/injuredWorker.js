'use strict';
const { Modal, Blocks } = require('slack-block-builder');
const { injuredWorkerBlocks } = require('../viewBlocks/injuredWorker')

const carePlan = (instanceurl, data) => {
    return {
        "type": "modal",
        "title": {
        	"type": "plain_text",
        	"text": "Injured Worker",
        	"emoji": true
        },
        "close": {
        	"type": "plain_text",
        	"text": "Close",
        	"emoji": true
        },
        "blocks": injuredWorkerBlocks
    }
};

module.exports = { carePlan }