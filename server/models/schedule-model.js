const mongoose = require("mongoose");

const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    Id: {
        type: Number,
        require: true,
    },
    Subject: {
        type: String,
        require: true,
    },
    Description: {
        type: String
    },
    StartTime: {
        type: Date,
        require: true,
    },
    EndTime: {
        type: Date,
        require: true,
    },
    Location: {
        type: String,
        require: false,
    },
    IsAllDay: {
        type: Boolean
    },
    RecurrenceRule: {
        type: String
    },
    StartTimezone: {
        type: String
    },
    EndTimezone: {
        type: String
    },
    UNTIL: {
        type: String
    },
    COUNT: {
        type: String
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,
    }

})

// export default mongoose.model("Schedule", scheduleSchema)
const Schedule = new mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;