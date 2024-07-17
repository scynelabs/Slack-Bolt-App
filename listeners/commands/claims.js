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

const claimsView = ((careplansData, sfUrl) => {

    const careplans = careplansData.records || []

	// `SELECT Id, Case__r.caseNumber, Employer_Account__r.Name, Injured_Worker__r.Name, Injury_Details__c, Injury_Type__c, CreatedDate FROM Lodgement_Claim__c WHERE Case__r.caseNumber='${caseNumber}'`
    console.log('carePlanBlocks data ==>', JSON.stringify(careplans))

    let result = [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": `Claims`,
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
                        "text": `*Employer:*\n${plan.Employer_Account__r.Name}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Injured Worker:*\n${plan.Injured_Worker__r.Name}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Injury Type:*\n${plan.Injury_Type__c}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Created Date:*\n${(new Date(plan.CreatedDate)).toLocaleString()}`
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

module.exports = { claimsView }