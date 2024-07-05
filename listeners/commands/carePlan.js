/* const carePlanView = {
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
}*/
//            `SELECT Id, Name, Case.caseNumber, Description, StartDate, EndDate, Participant.Name, CarePlanTemplate.Name, Status FROM CarePlan LIMIT 5`

const carePlanView = (careplans => {
    let result = []
    for(const plan in careplans){
        const carePlanBlocks = [
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Name:*\n${plan.Name}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Case:*\n<example.com|${plan.Case.caseNumber}>`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Start Date:*\n${plan.StartDate}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*End Date:*\n${plan.EndDate}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Status:*\n${plan.Status}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Description:*\n${plan.description}`
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

        result = [].concat(result, careplans)
        
    }

    return result
    
})

module.exports = { carePlanView }