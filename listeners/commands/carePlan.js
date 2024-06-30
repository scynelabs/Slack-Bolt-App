const carePlanView = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Care Plan",
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
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Name:*\nMarshall Care Plan"
				},
				{
					"type": "mrkdwn",
					"text": "*Case:*\n<example.com|00001517>"
				}
			]
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Start Date:*\nAug 10, 2023"
				},
				{
					"type": "mrkdwn",
					"text": "*End Date:*\nAug 30, 2023"
				}
			]
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Status:*\nProposed"
				}
			]
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Description:*\nCare plan description"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "<https://example.com|View request>"
			}
		}
	]
}

module.exports = { carePlanView }