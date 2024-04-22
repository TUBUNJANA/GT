const mongose = require("mongoose");
const URL = process.env.MONGO_URI;
// mongose.connect(URL);


const connectDb = async () => {
    try {
        await mongose.connect(URL);
        console.log("Database connection Successful");
    } catch (error) {
        console.error("Database connection failed");
        nextTick(error);
        process.exit(0);
    }
}

module.exports = connectDb;