const mongoose = require("mongoose");

const Schema = mongoose.Schema

const projectSchema = new Schema({
    ID: {
        type: String
    },
    Name: {
        type: String,
    },
    Description: {
        type: String
    },
    StartDate: {
        type: String
    },
    EndDate: {
        type: String
    },
    EstimatedHours: {
        type: Number,
        default:0
    },

    Status: {
        type: String
    },
    Type: {
        type: String
    },
    ActualHours: {
        type: Number,
        default:0
    },
    RemainingHours: {
        type: Number,
        default:0
    },
    Phase: [{
        ID: {
            type: String
        },
        Name: {
            type: String
        },
        Description: {
            type: String
        },
        StartDate: {
            type: String
        },
        EndDate: {
            type: String
        },
        EstimatedHours: {
            type: Number,
            default:0
        },
        Status: {
            type: String
        },
        ActualHours: {
            type: Number,
            default:0
        },
        RemainingHours: {
            type: Number,
            default:0
        },
        Role: [
            {
                ID: {
                    type: String
                },
                Name: {
                    type: String
                },

                EstimatedHours: {
                    type: Number,
                    default:0
                },

                ActualHours: {
                    type: Number,
                    default:0
                },
                RemainingHours: {
                    type: Number,
                    default:0
                },
                isRoleAssigned:{
                    type: Boolean,
                    default:false
                }
            }
        ]
    }],


})

const Schedule = new mongoose.model("project", projectSchema);

module.exports = Schedule;