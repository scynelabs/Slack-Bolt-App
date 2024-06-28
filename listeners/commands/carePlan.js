const carePlanView = {
	"type": "modal",
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
	"title": {
		"type": "plain_text",
		"text": "Your Care Plan",
		"emoji": true
	},
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "You're all set with your care plan."
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Contact*\nKatie Chen"
				},
				{
					"type": "mrkdwn",
					"text": "*Date*\nOct 22-23"
				}
			]
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": ":house: Accommodation"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Redwood Suite*\n*Share with 2 other person.* Studio home. Modern bathroom. TV. Heating. Full kitchen. Patio with lounge chairs and campfire style fire pit and grill."
			},
			"accessory": {
				"type": "image",
				"image_url": "https://api.slack.com/img/blocks/bkb_template_images/redwood-suite.png",
				"alt_text": "Redwood Suite"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": ":fork_and_knife: Food & Dietary restrictions"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*All-rounder*\nYou eat most meats, seafood, dairy and vegetables."
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": ":woman-running: Activities"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Winery tour and tasting*"
			},
			"fields": [
				{
					"type": "plain_text",
					"text": "Wednesday, Oct 22 2019, 2pm-5pm",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Hosted by Sandra Mullens",
					"emoji": true
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Sunrise hike to Mount Amazing*"
			},
			"fields": [
				{
					"type": "plain_text",
					"text": "Thursday, Oct 23 2019, 5:30am",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Hosted by Jordan Smith",
					"emoji": true
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Design systems brainstorm*"
			},
			"fields": [
				{
					"type": "plain_text",
					"text": "Thursday, Oct 23 2019, 11a",
					"emoji": true
				},
				{
					"type": "plain_text",
					"text": "Hosted by Mary Lee",
					"emoji": true
				}
			]
		}
	]
}

module.exports = { carePlanView }