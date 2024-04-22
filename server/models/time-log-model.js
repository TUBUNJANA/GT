const mongoose = require("mongoose");

const timeLog =  new mongoose.Schema({
    Name:{
        type:String,
    },
    Description:{
        type:String
    },
    LoggedHours:{
        type:Number,
        require:true
    },
    Date:{
        type:String,
        require:true
    },
    Time:{
        type:String
    },
    User:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
    Project:{
        type:mongoose.Types.ObjectId,
        ref:"project",
        require:true
    }

})

const timelog = new mongoose.model("timeLog", timeLog);

module.exports = timelog;