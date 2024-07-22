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
                        "url": "https://urldefense.com/v3/__https:/demo.docusign.net/signing/emails/v2-a225657d9bc9423aa30b1611e4dcc44a76dc6bc1f12b43118cd1b429aa643c1fb16a1a76e9a64b91b73b46bebf0cc1d6__;!!MpSF8J10V35rovo!89d1WSDG5BhkofdD9_zO4iEbpzGtxxb5ts621FA1ZX9osvlQoj1cYymyBa5m2DR_Kcg1MzDWfAmvNBCSTue4d5BU_pNxG3zi$",
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