const injuredWorkerView = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Injured worker",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Close",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Name:*\nKate Charlton"
				},
				{
					"type": "mrkdwn",
					"text": "*Email:*\n<example.com|kate.c@example.com>"
				}
			]
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Contact Phone:*\n0527727245"
				},
				{
					"type": "mrkdwn",
					"text": "*Contact Mobile:*\n047277272"
				}
			]
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Address:*\n29 Southbank road, VIC 3006 Australia"
				}
			]
		}
	]
}



module.exports = { injuredWorkerView }