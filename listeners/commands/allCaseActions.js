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
                        "url": "https://urldefense.com/v3/__https:/demo.docusign.net/signing/emails/v2-a225657d9bc9423aa30b1611e4dcc44a1b70842696c44c20a579fdfcc7fa2529101aaa5c9aab49d2baf71ecef0d2dba7__;!!MpSF8J10V35rovo!-rSF_qrSw7VS1KkgsWSKRgUBJOAxu7AKyKCS18sfmsrF9pCXLZGQZX8otoYpU5aRRM8imw6d36TESMsdKahsaY0dA86Nz6sp$",
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