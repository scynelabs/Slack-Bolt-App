    //             `SELECT Id, Work_Type_Group__r.Name, CaseNumber, Status, Licence_Type__c, Subject, Priority, Application_Date__c, Type, Account.Name FROM Case WHERE id='500Hu00002AzUVyIAN'`
    // `SELECT Id, Case__r.caseNumber, Employer_Account__r.Name, Injured_Worker__r.Name, Injury_Details__c, Injury_Type__c, CreateDate FROM Case WHERE Case__c='${caseId}'`
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
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `Case Details - ${caseInfo.CaseNumber}`,
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
                        "text": `*Plan Type:*\n${caseInfo.Type}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Priority:*\n${caseInfo.SDO_Sub_Type__c}`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [                    
                    {
                        "type": "mrkdwn",
                        "text": `*Priority:*\n${caseInfo.Priority}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Employer:*\n${caseInfo.Account.Name}`
                    }                    
                ]
            },
            {
                "type": "section",
                "fields": [                    
                    {
                        "type": "mrkdwn",
                        "text": `*Created Date:*\n${(new Date(caseInfo.CreatedDate)).toLocaleString()}`
                    }
                ]
            }
        ]
    }    
})




module.exports = { caseDetailsView }