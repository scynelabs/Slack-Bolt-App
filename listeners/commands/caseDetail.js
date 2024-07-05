    //             `SELECT Id, Work_Type_Group__r.Name, CaseNumber, Status, Licence_Type__c, Subject, Priority, Application_Date__c, Type, Account.Name FROM Case WHERE id='500Hu00002AzUVyIAN'`
// eslint-disable
const caseDetailsView = (caseData => {

    const records = caseData.records || []
    const caseInfo = records[0] || {}

    return {
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "Case details",
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
                        "text": `*Case number:*\n${caseInfo.CaseNumber}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Subject:*\n${caseInfo.Subject}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Plan Type:*\n${caseInfo.Licence_Type__c}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Contact Mobile:*\n${caseInfo.Application_Date__c}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Employer:*\n${caseInfo.Account.Name}`
                    }
                ]
            }
        ]
    }    
})




module.exports = { caseDetailsView }