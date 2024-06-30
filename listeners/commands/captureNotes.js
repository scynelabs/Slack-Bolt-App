const captureNotes = {
	"type": "modal",
	"submit": {
		"type": "plain_text",
		"text": "Submit Notes",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"title": {
		"type": "plain_text",
		"text": "Capture Notes",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": ":wave: Hey David!\n\nWe'd love to hear from you how we can make this place the best place you’ve ever worked.",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "You enjoy working here at Pistachio & Co",
				"emoji": true
			},
			"element": {
				"type": "radio_buttons",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Strongly agree",
							"emoji": true
						},
						"value": "1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Agree",
							"emoji": true
						},
						"value": "2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Neither agree nor disagree",
							"emoji": true
						},
						"value": "3"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Disagree",
							"emoji": true
						},
						"value": "4"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Strongly disagree",
							"emoji": true
						},
						"value": "5"
					}
				]
			}
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "What do you want for our team weekly lunch?",
				"emoji": true
			},
			"element": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select your favorites",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": ":pizza: Pizza",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":fried_shrimp: Thai food",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":desert_island: Hawaiian",
							"emoji": true
						},
						"value": "value-2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":meat_on_bone: Texas BBQ",
							"emoji": true
						},
						"value": "value-3"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":hamburger: Burger",
							"emoji": true
						},
						"value": "value-4"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":taco: Tacos",
							"emoji": true
						},
						"value": "value-5"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":green_salad: Salad",
							"emoji": true
						},
						"value": "value-6"
					},
					{
						"text": {
							"type": "plain_text",
							"text": ":stew: Indian",
							"emoji": true
						},
						"value": "value-7"
					}
				]
			}
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "What can we do to improve your experience working here?",
				"emoji": true
			},
			"element": {
				"type": "plain_text_input",
				"multiline": true
			}
		},
		{
			"type": "input",
			"label": {
				"type": "plain_text",
				"text": "Anything else you want to tell us?",
				"emoji": true
			},
			"element": {
				"type": "plain_text_input",
				"multiline": true
			},
			"optional": true
		}
	]
}

module.exports = { captureNotes }