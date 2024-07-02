const homeView = {
    "type": "home",
    "blocks": [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "My Dashboard",
                "emoji": true
            }
        },
        {
            "type": "context",
            "elements": [
                {
                    "type": "plain_text",
                    "text": "This page shows pending activities.",
                    "emoji": true
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": "*:books:\tOpen Cases*\n\t\t *23*"
                },
                {
                    "type": "mrkdwn",
                    "text": "*:briefcase:\tPriority Cases*\n\t\t *10*"
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": "*:hourglass:\t Pending review*\n\t\t *10*"
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Upcoming Training & Events",
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Return to work coordinator certificate training\n \n<http://www.example.com|Upcoming Training>"
            },
            "accessory": {
                "type": "image",
                "image_url": "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
                "alt_text": "calendar thumbnail"
            }
        }
    ]   
}

module.exports = { homeView }