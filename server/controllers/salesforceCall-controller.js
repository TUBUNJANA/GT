const express = require("express");
const jsforce = require("jsforce");
const Salesforce = express.Router();
const Project = require("../models/project-models");



const passwordWithToken = process.env.PPM_PASS + process.env.PPM_AUTH_TOKEN;
const userName = process.env.PPM_USER_NAME;

const conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(userName, passwordWithToken, (err, userInfo) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User Id:", userInfo.id);
    console.log("organization Id:", userInfo.organizationId);
  }
});

Salesforce.get("/", (req, res) => {
  conn.query(
    "SELECT Id,Name,ChikPeaSSB__Project_Description__c,ChikPeaSSB__Account__r.Name,\
     ChikPeaSSB__Est_Start_Date__c,ChikPeaSSB__End_Date__c,ChikPeaSSB__Status__c,\
     ChikPeaSSB__Total_Estimated_hours__c,(SELECT Id,Name,ChikPeaSSB__Est_Start_date__c,\
     ChikPeaSSB__Est_End_Date__c,ChikPeaSSB__Phase_Status__c,ChikPeaSSB__Estimated_Hours__c,\
     ChikPeaSSB__Descriptions__c FROM ChikPeaSSB__Project_Phases__r),(SELECT Id,ChikPeaSSB__Phase_Name__c,\
     Name,ChikPeaSSB__Item__r.Id,ChikPeaSSB__Item__r.Name,ChikPeaSSB__Estimated_Hours__c,\
     ChikPeaSSB__Actual_Hours__c,ChikPeaSSB__Remaining_Hours__c,ChikPeaSSB__Staff__r.Name,\
     ChikPeaSSB__Staff__r.Id FROM ChikPeaSSB__Resources__r) FROM ChikPeaSSB__Chikpea_Project__c LIMIT 1",
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        // const projectCreated = await Project.create({ name,description,startDate,endDate,status,estimatedHours,client,phase,role,estimatedPhaseEndDate });

        res.json(result.records);
      }
    }
  );
  //res.send("Salesforce Integration ")
});

//you can add as many request as you want on the same route but the API path should be unique. 
Salesforce.get("/sales", (req, res) => {
  conn.query(
    "SELECT Id,Name,ChikPeaSSB__Project_Description__c,ChikPeaSSB__End_Date__c FROM ChikPeaSSB__Chikpea_Project__c",
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result.records);
      }
    }
  );
  //res.send("Salesforce Integration ")
});

module.exports = Salesforce;
