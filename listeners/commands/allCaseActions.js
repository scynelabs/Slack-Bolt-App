const allCaseActionsView = async (caseNumber) => {
    return {
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "All Case Actions",
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "💥 View Case",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "view_case"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "🤕 View Injured Worker",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "view_injured_worker"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "🧾 View Claims",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "view_claims"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "💝 View Care Plan",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "view_care_plan"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "📝 Capture Notes",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "capture_notes"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "✍️ E-Sign document",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "url": "https://urldefense.com/v3/__https:/demo.docusign.net/signing/emails/v2-a225657d9bc9423aa30b1611e4dcc44a6ecadba56db347b3a247bc19c20092765cfdf76269934d7b8542a4a36710b64e__;!!MpSF8J10V35rovo!5Tbo23YZMJb8lm6bKsCCMkgS8oiUsWI4T9VXFGUXxjP7rfNLUqfbmYfCCtfZdrZHvY4sii9e2mr1b8vq5KpS-UhQvM3BF08M$",
                        "action_id": "esign_document"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "✅ Finish Case Swarm",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "finish_case_swarm"
                    }
                ]
            }
        ]
    }
}

module.exports = { allCaseActionsView }