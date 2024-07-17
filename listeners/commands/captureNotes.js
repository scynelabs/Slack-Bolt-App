const captureNotesView = (data => {

	const private_metadata = {
		channel_name: data.channel_name,
		channel_id: data.channel_id,
		user_id: data.user_id
	}
	return {
		"type": "modal",
		// View identifier
		"callback_id": 'add_notes_files',	
		"title": {
			"type": "plain_text",
			"text": "Notes & Files",
			"emoji": true
		},
		"submit": {
			"type": "plain_text",
			"text": "Submit",
			"emoji": true
		},
		"close": {
			"type": "plain_text",
			"text": "Cancel",
			"emoji": true
		},
		"private_metadata": `${JSON.stringify(private_metadata)}`,
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Please provide more details about the incident."
				},
				"block_id": `${data.channel_name}`
			},
			{
				"type": "input",
				"block_id": "notes_subject_block_id",
				"label": {
					"type": "plain_text",
					"text": "Subject"
				},
				"element": {
					"type": "plain_text_input",
					"action_id": "subject",
					"placeholder": {
						"type": "plain_text",
						"text": "Type in here"
					},
					"multiline": false
				},
				"optional": false
			},
			{
				"type": "input",
				"block_id": "notes_description_block_id",
				"label": {
					"type": "plain_text",
					"text": "Notes"
				},
				"element": {
					"type": "plain_text_input",
					"action_id": "description",
					"placeholder": {
						"type": "plain_text",
						"text": "Type in here"
					},
					"multiline": true
				},
				"optional": false
			},
			{
				"type": "input",
				"block_id": "notes_file_block_id",
				"label": {
				"type": "plain_text",
				"text": "Upload Files"
				},
				"element": {
				"type": "file_input",
				"action_id": "file_input_action_id_1",
				"filetypes": ["jpg", "png"],
				"max_files": 1,
				},
				"optional": true
			}
		]
	}
})

module.exports = { captureNotesView }