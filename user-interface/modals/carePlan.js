'use strict';
const { Modal, Blocks } = require('slack-block-builder');
const { carePlanBlocks } = require('../viewBlocks/carePlan')

const carePlan = (instanceurl, data) => {
    return {
        "type": "modal",
        "title": {
        	"type": "plain_text",
        	"text": "Care Plan",
        	"emoji": true
        },
        "close": {
        	"type": "plain_text",
        	"text": "Close",
        	"emoji": true
        },
        "blocks": carePlanBlocks
    }
};

module.exports = { carePlan }