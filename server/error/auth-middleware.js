const jwt = require("jsonwebtoken");
const user = require("../models/user-model")




const authMiddleWare = async (request, response, next) => {
    const token = request.header("Authorization");
    console.log("token from frontend", token);
    try {
        const jwtToken = token.replace("Bearer", "").trim();
        console.log("token from frontend", jwtToken);

        const isVerifyed = jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN);
        console.log("Is veryfied", isVerifyed);
        const userData = await user.findOne({ _id: isVerifyed.userId }).select({
            password: 0,
        });
        console.log(userData);
        request.user = userData;
        request.token = token;
        request.userID = userData._id;
        next();
    } catch (error) {
        // next(error);
        return response.status(400).json({ msg: "Unauthorized. Invalid token" });
    }

}


module.exports = authMiddleWare;