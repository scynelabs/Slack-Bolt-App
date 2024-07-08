'use strict';

const queryAllCases = async (connection) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id,Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Approver__r.Name, Name FROM Travel_Request__c WHERE OwnerId = \'${currentuser.user_id}\' ORDER BY Name`
            `SELECT Id, CaseNumber, Status, Subject, Priority, CreatedDate, Type, Account.Name FROM Case LIMIT 5`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseDetail = async (connection, caseId='500Kj00001ZwOx4IAF') => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, CaseNumber, Status, Subject, Priority, CreatedDate, Type, Account.Name FROM Case WHERE id='${caseId}'`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseCarePlans = async (connection) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Name, Case.caseNumber, Description, StartDate, EndDate, Participant.Name, CarePlanTemplate.Name, Status FROM CarePlan LIMIT 5`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseInjuredWorker = async (connection, caseId='500Kj00001ZwOx4IAF') => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Contact.Name, Account.Name, ContactEmail, ContactPhone, ContactMobile FROM Case WHERE id='${caseId}'`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
}

const queryClaims = async (connection, caseId='500Kj00001aT9qdIAC') => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Case__r.caseNumber, Employer_Account__r.Name, Injured_Worker__r.Name, Injury_Details__c, Injury_Type__c, CreateDate FROM Case WHERE Case__c='${caseId}'`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};


module.exports = {
    queryAllCases,
    queryCaseDetail, 
    queryCaseCarePlans,
    queryCaseInjuredWorker,
    queryClaims
};