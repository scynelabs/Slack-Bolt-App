'use strict';

const queryAllCases = async (connection) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id,Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Approver__r.Name, Name FROM Travel_Request__c WHERE OwnerId = \'${currentuser.user_id}\' ORDER BY Name`
            `SELECT Id, Work_Type_Group__r.Name, CaseNumber, Status, Licence_Type__c, Subject, Priority, Application_Date__c, Type, Account.Name LIMIT 5`
        );
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};

const queryCaseDetail = async (connection) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Work_Type_Group__r.Name, CaseNumber, Status, Licence_Type__c, Subject, Priority, Application_Date__c, Type, Account.Name FROM Case WHERE id='500Hu00002AzUVyIAN'`
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

const queryCaseInjuredWorker = async (connection) => {
    try {
        //Get the UserId
        const currentuser = await connection.identity();

        // Query for travel requests
        const result = await connection.query(
            //`SELECT Id, Cost__c, Description__c, Destination__c, End_Date__c, Origin__c, Start_Date__c, Status__c, Owner.Name, Name FROM Travel_Request__c WHERE Approver__c = \'${currentuser.user_id}\' AND Status__c = 'New' ORDER BY Name`
            `SELECT Id, Contact.Name, Account.Name, ContactEmail, ContactPhone, ContactMobile FROM Case WHERE id='500Hu00002AzUVyIAN'`
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
    queryCaseInjuredWorker
};