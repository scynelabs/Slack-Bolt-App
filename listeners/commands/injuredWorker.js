const injuredWorkerView = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Injured worker details",
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
				"text": "Contact details - James S."
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "plain_text",
					"text": "Case Number",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "00001552",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Subject",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Injured at client site",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Status",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "New",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Application Date",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "04/02/2024",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Claim Type",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Physical",
					"emoji": true
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "View details",
						"emoji": true
					},
					"value": "click_me_123"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Delete",
						"emoji": true
					},
					"value": "click_me_123",
					"url": "https://google.com"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Review",
						"emoji": true
					},
					"value": "click_me_123",
					"url": "https://google.com"
				}
			]
		}
	]
}



module.exports = { injuredWorkerView }