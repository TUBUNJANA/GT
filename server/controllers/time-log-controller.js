const timelog = require("../models/time-log-model");
const project = require("../models/project-models")


const createTimelog = async (request, response) => {
    try {
        console.log("The request body of createTimelog"+JSON.stringify(request.body));
        const User = request.userID;

        const { Name, Description, LoggedHours, Date, Time, Project, Phase, Role } = request.body;

        const TimeLog = await timelog.create({ Name, Description, LoggedHours, Date, Time, Project, User });
        const getProject = await project.findOne({ _id: Project });
        let outerIndex = 0;
        let innerIndex = 0;
        console.log("The data of Phase = "+Phase)
        getProject.Phase.map((item, index1) => {
            if (item.Name === Phase) {
                outerIndex = index1;
                item.Role.map((elem, index2) => {
                    if (elem.Name === Role) {
                        innerIndex = index2;
                    }
                })
            }
        })

        console.log("The type of "+typeof(getProject.Phase[outerIndex].Role[innerIndex].ActualHours));
        console.log("The type of "+typeof(LoggedHours));
        console.log("The value of  "+(getProject.Phase[outerIndex].Role[innerIndex].ActualHours+LoggedHours));

        const updateProject = await project.updateOne({ _id: Project }, {
            $set: {
                [`Phase.${outerIndex}.Role.${innerIndex}.ActualHours`]:getProject.Phase[outerIndex].Role[innerIndex].ActualHours+parseInt(LoggedHours),
                [`Phase.${outerIndex}.Role.${innerIndex}.RemainingHours`]:getProject.Phase[outerIndex].Role[innerIndex].RemainingHours-parseInt(LoggedHours),
                [`Phase.${outerIndex}.ActualHours`]:getProject.Phase[outerIndex].ActualHours+parseInt(LoggedHours),
                [`Phase.${outerIndex}.RemainingHours`]:getProject.Phase[outerIndex].RemainingHours-parseInt(LoggedHours),
                RemainingHours:getProject.RemainingHours-parseInt(LoggedHours),
                ActualHours:getProject.ActualHours+parseInt(LoggedHours)
            }
        });
        response.status(200).send({ msg: "Timelog creared successfully" ,update:updateProject});

    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        // next(error);
        console.log("The error of  createTimelog = "+error);
    }
}


module.exports = { createTimelog };