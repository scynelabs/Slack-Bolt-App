    //             `SELECT Id, Work_Type_Group__r.Name, CaseNumber, Status, Licence_Type__c, Subject, Priority, Application_Date__c, Type, Account.Name FROM Case WHERE id='500Hu00002AzUVyIAN'`
// eslint-disable
const caseDetailView = async (case => {

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
                        "text": `*Case number:*\n${case.caseNumber}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Subject:*\n${case.Subject}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Plan Type:*\n${case.Licence_Type__c}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Contact Mobile:*\n${case.Application_Date__c}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Employer:*\n${case.Account.Name}`
                    }
                ]
            }
        ]
    }    
})




module.exports = { caseDetailsView }