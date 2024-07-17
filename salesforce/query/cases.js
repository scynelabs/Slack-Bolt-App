'use strict';

const queryAllCases = async (connection) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id,Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Approver__r.Name, Name FROM Travel_Request__c WHERE OwnerId = \'${currentuser.user_id}\' ORDER BY Name`
            `SELECT Id, CaseNumber, Status, Subject, Priority, CreatedDate, Type, SDO_Sub_Type__c, Account.Name FROM Case LIMIT 5`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseDetail = async (connection, caseNumber) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, CaseNumber, Status, Subject, Priority, CreatedDate, Type, SDO_Sub_Type__c, Account.Name FROM Case WHERE CaseNumber='${caseNumber}'`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseCarePlans = async (connection, caseNumber) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            // `SELECT Id, Name, Case.caseNumber, Description, StartDate, EndDate, Participant.Name, CarePlanTemplate.Name, Status FROM CarePlan LIMIT 5`
            `SELECT Id, Name, Case__r.caseNumber, RTW__c, Start_Date__c, End_Date__c, Contact__r.Name, Status__c FROM Return_to_Work_Plan__c WHERE Case__r.caseNumber=${caseNumber}`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseInjuredWorker = async (connection, caseNumber) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Contact.Name, Account.Name, ContactEmail, ContactPhone, ContactMobile, Contact.MailingAddress FROM Case WHERE CaseNumber='${caseNumber}'`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
}

const queryClaims = async (connection, caseNumber) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Name, Case__r.caseNumber, Employer_Account__r.Name, Injured_Worker__r.Name, Injury_Details__c, Injury_Type__c, CreatedDate FROM Lodgement_Claim__c WHERE Case__r.caseNumber='${caseNumber}'`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const closwSwarm = async (connection, caseNumber) => {
    // body payload structure is depending to the Apex REST method interface.
    // const body = { action: 'closeSwarm', caseNumber };
    const body = {
        "data": {"caseNumber": caseNumber },
        "event": "closeSwarm"
    }        

    console.log('CloseSwarm body payload data ==>', body)
    
    const res = await connection.apex.post("/CaseManagement/v1/"+caseNumber, body);
    console.log("response: ", res);
}

const saveCaseNotesAndFiles = async (connection, caseNumber, notesData) => {
    // body payload structure is depending to the Apex REST method interface.
    // const body = { action: 'closeSwarm', caseNumber };
    const body = {
        "data": { ...notesData },
        "event": "addNotes"
    }        

    console.log('Notes body payload data ==>', body)
    
    const res = await connection.apex.post("/CaseManagement/v1/"+caseNumber, body);
    console.log("response: ", res);
}


module.exports = {
    queryAllCases,
    queryCaseDetail, 
    queryCaseCarePlans,
    queryCaseInjuredWorker,
    queryClaims,
    closwSwarm,
    saveCaseNotesAndFiles
};