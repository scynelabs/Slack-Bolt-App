

// Handle a view_submission request
const addCaseNotes = async ({ ack, body, view, client, context, logger }) => {
    // Acknowledge the view_submission request
    await ack();

    
    logger.info('User submitted dialog ==>', JSON.stringify(view.state.values))
    logger.info(view.state.values)
    logger.info(body)
  
    //input_block_id: { file_input_action_id_1: { type: 'file_input', files: [Array] } }
    console.log('File data', view.state.values['notes_subject_block_id']["file_input_action_id_1"].files)

    /*"block_id": "notes_subject_block_id",
    // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verification of their submission
  
    // Assume there's an input block with `block_1` as the block_id and `input_a`
    const val = view['state']['values']['block_1']['input_a'];
    const user = body['user']['id'];
  
    // Message to send user
    let msg = '';
    // Save to DB
    const results = await db.set(user.input, val);
  
    if (results) {
      // DB save was successful
      msg = 'Your submission was successful';
    } else {
      msg = 'There was an error with your submission';
    }
  
    // Message the user
    try {
      await client.chat.postMessage({
        channel: user,
        text: msg
      });
    }
    catch (error) {
      logger.error(error);
    }
    */
  
  };

  module.exports.register = (app) => {
    app.view('add_notes_files', addCaseNotes);
};
