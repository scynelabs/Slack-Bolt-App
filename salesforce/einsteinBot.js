const { v4: uuidv4 } = require('uuid');// uuidv4();
const axios = require('axios');

const startSession = async (sfConnection => {

    // Send a POST request
    axios({
            method: 'post',
            url: `${process.env.RUNTIME_BASE_URL}/v5.0.0/bots/${process.env.BOT_ID}/sessions`,
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'Authorization': `Bearer {{jwt_token}}`,
                'Content-Type': 'application/json'
            },
            data: {
                "forceConfig": {
                    "endpoint": process.env.FORCE_CONFIG_ENDPOINY
                },
                "externalSessionKey": uuidv4()
            }
        }
    ).then( response => {
        console.log('Start session response ==>', response)
    })
})

const sendMessage = async ((sfConnection, oauthToken, sessionId, transactionId, message) => {
    // Send a POST request
    axios({
            method: 'post',
            url: `${process.env.RUNTIME_BASE_URL}/v5.0.0/sessions/${sessionId}/messages`,
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                "message": {
                    "sequenceId": 3,
                    "type": "text",
                    "text": message,
                    "inReplyToMessageId": transactionId
                }
            }
        }
    ).then( response => {
        console.log('Start session response ==>', response)
    })
})


const closeSession = async (sessionId) => {
    // Send a POST request
    axios({
            method: 'delete',
            url: `${process.env.RUNTIME_BASE_URL}/v5.0.0/sessions/${sessionId}`,
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'X-Session-End-Reason': `UserRequest`,
                'Authorization': `Bearer ${''}`
            },
            data: {
                "forceConfig": {
                    "endpoint": process.env.FORCE_CONFIG_ENDPOINY
                },
                "externalSessionKey": uuidv4()
            }
        }
    ).then( response => {
        console.log('Start session response ==>', response)
    })    
}