const assignedProject = require("../models/assigned-project-model");
const project = require("../models/project-models")

const assignProject = async (request, response) => {
    try {
        console.log(request.body);
        const { projectDetails, Phase, Role } = request.body;
        userId = request.userID;
        console.log("the project id = " + projectDetails);
        const isAlreadyApplyed = await assignedProject.findOne({ projectDetails: projectDetails, userDetails: userId, Phase: Phase, Role: Role });
        if (isAlreadyApplyed) {
            return response.status(200).json({ msg: "Already applied!" });
        }


        console.log("The assigned project data is = " + userId);
        const userCreated = await assignedProject.create({ projectDetails: projectDetails, Status: "Pending", userDetails: userId, Phase: Phase, Role: Role });
        response.status(200).send({ msg: "Succussfully Applied!" });

    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        console.log("The error in assignProject contoller is  =  " + error);
        // next(error);
    }
}
const allProjectAssociateWithUser = async (request, response) => {
    try {
        console.log(request.body);
        userId = request.userID;
        const allProject = await assignedProject.find({ userDetails: userId }).populate('projectDetails');
        if (allProject) {

            response.status(200).send({ msg: "Succussfull", Data: allProject });
        } else {
            response.status(200).send({ msg: "Empty" });
        }

    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        console.log("The error in assignProject contoller is  =  " + error);
        // next(error);
    }
}
const allAssignedProject = async (request, response) => {
    try {
        console.log(request.body);
        userId = request.userID;
        const allProject = await assignedProject.find().populate('projectDetails').populate('userDetails');
        if (allProject) {

            response.status(200).send({ msg: "Succussfull", Data: allProject });
        } else {
            response.status(200).send({ msg: "Empty" });
        }

    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        console.log("The error in assignProject contoller is  =  " + error);
        // next(error);
    }
}
const approvalRequest = async (request, response) => {
    try {
        const { Status, AssignedProjectId, ProjectId, Phase, Role } = request.body;

        console.log("I am approvalRequest controller");
        const getProject = await project.findOne({ _id: ProjectId });
        let outerIndex = 0;
        let innerIndex = 0;
        console.log("The data of Phase = " + Phase)
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
        if (getProject.Phase[outerIndex].Role[innerIndex].isRoleAssigned === true) {
            response.status(200).send({ "message": "This project is already assigned to some one" });
        } else {
            if (Status === "Approved") {


                const updateProject = await project.updateOne({ _id: ProjectId }, {
                    $set: {
                        [`Phase.${outerIndex}.Role.${innerIndex}.isRoleAssigned`]: true
                    }
                });
            }
            const updateProjectStatus = await assignedProject.updateOne({ _id: AssignedProjectId }, {
                $set: {
                    Status: Status
                }
            });
            response.status(200).send({ "message": "Status updated successfully" });
        }


    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        console.log("The error in assignProject contoller is  =  " + error);
        // next(error);
    }
}


module.exports = { assignProject, allProjectAssociateWithUser, allAssignedProject, approvalRequest }