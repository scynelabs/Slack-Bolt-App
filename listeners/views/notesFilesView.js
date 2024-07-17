const notesFilesView = (data => {
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
                "type": "context",
                "elements": [
                    {
                        "type": "file",
                        "external_id": data.files[0].external_id,
                        "source": "remote"
                    }
                ]
            }
        ]
    }
})

module.exports = { notesFilesView }