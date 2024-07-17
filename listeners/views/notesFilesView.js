const notesFilesView = (data => {

    if(data.files.length > 0){
        return {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "📝 New note attached to the case. "
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `*Subject* ${data.notesSubject}`
                        }
                    ]
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `*Description* ${data.notesDescription}`
                        }
                    ]
                },
                {
                    "type": "image",
                    "title": {
                      "type": "plain_text",
                      "text": "Shared file"
                    },
                    "block_id": "image-123",
                    "slack_file": {
                      "id": `${data.files[0].id}`
                    },
                    "alt_text": `${data.notesSubject}`
                }
            ]
        }
    }

    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "📝 New note attached to the case. "
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `*Subject* ${data.notesSubject}`
                    }
                ]
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `*Description* ${data.notesDescription}`
                    }
                ]
            }
        ]
    }

})

module.exports = { notesFilesView }