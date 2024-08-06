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
                        "url": "https://urldefense.com/v3/__https:/demo.docusign.net/signing/emails/v2-a225657d9bc9423aa30b1611e4dcc44ae6c0c9baac1f43bf927d78826b846039ed54325cc12344f68211e9bd5ca56911__;!!MpSF8J10V35rovo!5D-vaeg-C12M_8XY33FUDpSBXgmrAl3Xy2PBf0zvTZQdbomSIKoi-v1XSqS4bW1uCMmWa4ILfBXS1ky17yWGLMmCahwI2fYp$",
                        "action_id": "esign_document"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "🤖 Chatbot",
                            "emoji": true
                        },
                        "value": caseNumber,
                        "action_id": "start_chat"
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