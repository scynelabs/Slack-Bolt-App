'use strict';
const { Modal, Blocks } = require('slack-block-builder');
const { notesBlocks } = require('../viewBlocks/captureNotes')

const carePlan = (instanceurl, username) => {
    return {
        "type": "modal",
        "title": {
        	"type": "plain_text",
        	"text": "Capture Notes",
        	"emoji": true
        },
        "close": {
        	"type": "plain_text",
        	"text": "Close",
        	"emoji": true
        },
        "blocks": notesBlocks
    }
};

module.exports = { carePlan }