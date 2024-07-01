const captureNotesView = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Notes & Files",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Please provide more details about the incident."
			},
			"block_id": "section1"
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "Subject"
			},
			"element": {
				"type": "plain_text_input",
				"action_id": "subject",
				"placeholder": {
					"type": "plain_text",
					"text": "Type in here"
				},
				"multiline": false
			},
			"optional": false
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "Notes"
			},
			"element": {
				"type": "plain_text_input",
				"action_id": "notes",
				"placeholder": {
					"type": "plain_text",
					"text": "Type in here"
				},
				"multiline": true
			},
			"optional": false
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Please upload the necessary files."
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Upload"
				},
				"value": "click",
				"url": "https://www.google.com",
				"action_id": "button-action"
			}
		}
	]
}

module.exports = { captureNotesView }