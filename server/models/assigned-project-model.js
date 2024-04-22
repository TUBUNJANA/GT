const mongoose = require("mongoose");

const Schema = mongoose.Schema

const assignedProject = new Schema({
    projectDetails: {
        type: mongoose.Types.ObjectId,
        ref: "project",
        require: true,
    },
    userDetails: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,
    },
    Phase: {
        type: String
    },
    Role: {
        type: String
    },
    Status: {
        type: String
    }


})

const Schedule = new mongoose.model("AssignedProject", assignedProject);

module.exports = Schedule;