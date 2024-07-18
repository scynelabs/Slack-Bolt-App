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
//             `SELECT Id, Name, Case__r.caseNumber, RTW__c, Start_Date__c, End_Date__c, Contact__r.Name, Status__c FROM Return_to_Work_Plan__c WHERE Case__r.caseNumber=${caseNumber}`

const carePlanView = ((careplansData, sfUrl) => {

    const careplans = careplansData.records || []

    console.log('carePlanBlocks data ==>', JSON.stringify(careplans))

    let result = [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": `Care plan`,
				"emoji": true
			}
		},
		{
			"type": "divider"
		}
	]
    for(const plan of careplans){
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
                        "text": `*Case:*\n<${sfUrl+'/'+plan.Case__r.Id}|${plan.Case__r.CaseNumber}>`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Start Date:*\n${(new Date(plan.Start_Date__c)).toLocaleString()}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*End Date:*\n${(new Date(plan.End_Date__c)).toLocaleString()}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Status:*\n${plan.Status__c}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*RTW Plan:*\n${plan.RTW__c}`
                    },
					{
                        "type": "mrkdwn",
                        "text": `*RTW Plan Detail:*\n${plan.RTW_Plan_Detail__c}`
                    }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `<${sfUrl+'/'+plan.Id}|View request>`
                }
            }
        ]

		carePlanBlocks.push({
			"type": "divider"
		})

        result = [].concat(result, carePlanBlocks )
        
    }

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
		"blocks": result,
	}
    
})

module.exports = { carePlanView }