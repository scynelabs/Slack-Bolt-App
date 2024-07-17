
const { 
  saveCaseNotesAndFiles
} = require('../../salesforce/query/cases');

// Handle a view_submission request
const addCaseNotes = async ({ ack, body, view, client, context, logger }) => {
    // Acknowledge the view_submission request
    await ack();

    logger.info('Body submitted dialog ==>', JSON.stringify(body));
    logger.info('User submitted dialog ==>', JSON.stringify(view.state.values));
    logger.info(view.state.values)
    logger.info(body)
  
    //input_block_id: { file_input_action_id_1: { type: 'file_input', files: [Array] } }
    console.log('File data', view.state.values['notes_file_block_id']["file_input_action_id_1"].files)

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
    */
    // Message the user
    try {
      // await client.chat.postMessage({
      //   channel: user,
      //   text: msg
      // });
      body.channel_name = view['private_metadata'];
      const caseNumber = _getCaseId(body);
      const notesData = {
        caseNumber,
        notesSubject: view.state.values['notes_subject_block_id']["subject"],
        notesDescription: view.state.values['notes_description_block_id']["description"]
      };

      console.log('Notes payload data ==>', notesData)

      await saveCaseNotesAndFiles(context.sfconnection, caseNumber, notesData)
      /*
      if(view.state.values['notes_file_block_id']["file_input_action_id_1"].files.length > 0){
        fetch()
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          // Here's where you get access to the blob
          // And you can use it for whatever you want
          // Like calling ref().put(blob)
          await saveCaseNotesAndFiles(context.sfConnection, caseNumber, {

          })
      });
      }*/
    }
    catch (error) {
      logger.error(error);
    }
    
};

function _getCaseId(body){
  //channel_name
  if(body){
      const regexp = /swarm-case-([\w\d]+)/g;
      const str = body.channel_name || body.channel?.name

      const matchingResult = [...str.matchAll(regexp)];
      if(matchingResult && matchingResult.length > 0){
          return matchingResult[0][1]
      }
  }
  return null
}

module.exports.register = (app) => {
    app.view('add_notes_files', addCaseNotes);
};
