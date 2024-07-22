const { v4: uuidv4 } = require('uuid');// uuidv4();
const axios = require('axios');

const startSession = async (sfConnection, context) => {

    /*
    // Send a POST request
    axios({
            method: 'post',
            url: `${process.env.RUNTIME_BASE_URL}/v5.0.0/bots/${process.env.BOT_ID}/sessions`,
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'Authorization': `Bearer ${sfConnection.accessToken}`,
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
        console.log('Start session response ==>', response.data)

        context.bot_sessionId = response.data.sessionId;
    })
    */

    console.log('Starting session...')

    axios.post(`${process.env.RUNTIME_BASE_URL}/v5.0.0/bots/${process.env.BOT_ID}/sessions`, 
        {
            "forceConfig": {
                "endpoint": process.env.FORCE_CONFIG_ENDPOINY
            },
            "externalSessionKey": uuidv4()
        }, 
        {
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'Authorization': `Bearer ${sfConnection.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    ).then( response => {
        console.log('Start session response ==>', response.data)

        context.chatbotSessionInfo = response.data;
    })
    .catch(function (error) {
        console.log('startSession Error ==>')
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
}

// const sendMessage = async (sfConnection, sequenceId, sessionId, transactionId, message) => {
    const sendMessage = async (context, message) => {    

    const { sfconnection, chatbotSessionInfo } = context;

    const { sessionId } = chatbotSessionInfo;

    const lastMessage = chatbotSessionInfo.messages[ chatbotSessionInfo.messages.length - 1 ];

    // Send a POST request
    return axios.post(`${process.env.RUNTIME_BASE_URL}/v5.0.0/sessions/${sessionId}/messages`, 
        {
            "message": {
                "sequenceId": chatbotSessionInfo.messages.length,
                "type": "text",
                "text": message,
                "inReplyToMessageId": lastMessage.id
            }
        },
        {
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'Authorization': `Bearer ${sfconnection.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        
    ).then( response => {
        console.log('sendMessage session response ==>', response.data)

        return response.data
    })
    .catch(function (error) {
        console.log('sendMessage Error ==>')
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
}


const closeSession = async (sessionId) => {
    // Send a POST request

    axios.delete(`${process.env.RUNTIME_BASE_URL}/v5.0.0/sessions/${sessionId}`, 
        {
            "forceConfig": {
                "endpoint": process.env.FORCE_CONFIG_ENDPOINY
            },
            "externalSessionKey": uuidv4()
        },
        {
            headers: {
                'X-Org-Id': process.env.ORG_ID,
                'X-Request-Id': uuidv4(),
                'X-Session-End-Reason': `UserRequest`,
                'Authorization': `Bearer ${sfConnection.accessToken}`
            }
        }
    ).then( response => {
        console.log('sendMessage session response ==>', response)
    })    
}

module.exports = {
    startSession,
    sendMessage,
    closeSession
}