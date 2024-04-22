const User = require("../models/user-model");
const Schedule = require("../models/schedule-model");




const createSchedule = async (request, response) => {
    try {
        console.log(request.body);
        const UserId= request.userID;
        const {Id,Description,COUNT,StartTime,EndTime,IsAllDay,RecurrenceRule,StartTimezone,EndTimezone,UNTIL,Subject,Location} = request.body;
        const userExist = await User.findOne({ _id: UserId });
        if (!userExist) {
            return response.status(400).json({ msg: "Invalid User" });
        }

        const scheduleCreate = await Schedule.create({ Id,Description,Subject,StartTime,EndTime,IsAllDay,Location,RecurrenceRule,StartTimezone,EndTimezone,UNTIL,UserId});
        response.status(200).send({ msg: "Schedule Created successfull", scheduleId: scheduleCreate._id.toString() });

    } catch (error) {
        response.status(400).send({"message":error});
        console.log("Create schedule erroe = "+error);
    }
}
const retriveSchedule = async (request, response) => {
    try {
        console.log(request.body);
        const userID = request.userID;
        const scheduleExist = await Schedule.find({ UserId: userID });
        if(scheduleExist){

            response.status(200).send({ msg: "Schedule fatched successfull", scheduleData: scheduleExist});
        }

    } catch (error) {
        response.status(400).send({"message":error});
        console.log("retriveSchedule schedule error = "+error);
    }
}



const updateSchedule = async (request, response) => {
    try {
        console.log(request.body);
        const {_id,Id,Description,StartTime,EndTime,COUNT,IsAllDay,RecurrenceRule,StartTimezone,EndTimezone,UNTIL,Subject,Location} = request.body;
        const scheduleExist = await Schedule.findOne({ _id: _id });
        if(scheduleExist){
            const scheduleUpdated = await Schedule.updateOne({_id:_id},{$set:{COUNT:COUNT,IsAllDay:IsAllDay,RecurrenceRule:RecurrenceRule,StartTimezone:StartTimezone,EndTimezone:EndTimezone,UNTIL:UNTIL,Id:Id,Description:Description,StartTime:StartTime,EndTime:EndTime,Subject:Subject,Location:Location}});

            response.status(200).send({ msg: "Schedule updated successfully", scheduleData: scheduleUpdated});
        }else{
            response.status(400).send({"message":"schedule not found"});
        }

    } catch (error) {
        response.status(400).send({"message":error});
        console.log("retriveSchedule schedule error = "+error);
    }
}

const deleteSchedule = async (request, response) => {
    try {
        console.log(request.body);
        const {_id,Id,Description,StartTime,EndTime,COUNT,IsAllDay,RecurrenceRule,StartTimezone,EndTimezone,UNTIL,Subject,Location} = request.body;
        const scheduleExist = await Schedule.findOne({ _id: _id });
        if(scheduleExist){
            const scheduleDeleted = await Schedule.deleteOne({_id:_id});

            response.status(200).send({ msg: "Schedule deleted successfully", scheduleData: scheduleDeleted});
        }else{
            response.status(400).send({"message":"schedule not found"});
        }

    } catch (error) {
        response.status(400).send({"message":error});
        console.log("retriveSchedule schedule error = "+error);
    }
}

module.exports = { createSchedule,retriveSchedule,updateSchedule ,deleteSchedule};