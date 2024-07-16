

const injuredWorkerView =  ((caseData, sfUrl) => {

    const records = caseData.records || []
    const caseInfo = records[0] || {}
	// `SELECT Id, Contact.Name, Account.Name, ContactEmail, ContactPhone, ContactMobile FROM Case WHERE CaseNumber='${caseNumber}'`
	const mailingAddress = caseInfo.Contact?.MailingAddress;
	console.log('Mailing address=>', JSON.stringify(caseInfo.Contact?.MailingAddress))	
	const address = mailingAddress && mailingAddress.MailingStreet ? `${mailingAddress?.MailingStreet}\n${mailingAddress.MailingCity}\n${mailingAddress.MailingState}\n${mailingAddress.MailingPostCode}\n${mailingAddress.MailingCountry}`: ''

    return {
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
				"type": "header",
				"text": {
					"type": "plain_text",
					"text": `Injured worker - ${caseInfo.Contact?.Name}`,
					"emoji": true
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
						"text": `*Name:*\n${caseInfo.Contact?.Name}`
					},
					{
						"type": "mrkdwn",
						"text": `*Employer:*\n<${sfUrl+'/'+caseInfo.Id}|${caseInfo.Account?.Name}>`
					}
				]
			},
			{
				"type": "section",
				"fields": [
					{
						"type": "mrkdwn",
						"text": `*Contact Phone:*\n${caseInfo.ContactPhone}`
					},
					{
						"type": "mrkdwn",
						"text": `*Contact Mobile:*\n${caseInfo.ContactMobile}`
					}
				]
			},
			{
				"type": "section",
				"fields": [
					{
						"type": "mrkdwn",
						"text": `*Email:*\n<${'mailto:'+caseInfo.ContactEmail}|${caseInfo.ContactEmail}>`
					},
					{
						"type": "mrkdwn",
						"text": `*Mailing Address:*\n${address}`
					}
				]
			}
		]
	}
})



module.exports = { injuredWorkerView }