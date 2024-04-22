const User = require("../models/user-model");





const home = async (request, response) => {
    try {
        response.status(200).send("Successfully connected from controller");
    } catch (error) {
        // response.status(400).send({"message":"page not found"});
        next(error);
    }
}


const register = async (request, response) => {
    try {
        console.log(request.body);
        const {employmentEndDate,educationQualification,isAdmin,employmentStartDate,skills,jobDescription,workHistory,linkdInLink,jobTitle,currentEmployer,country,ZIPCode,state,city, lastName,firstName,middleName,countryCode, email, phone, password, dob, streetAddress,image } = request.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return response.status(400).json({ msg: "Email aiready exists." });
        }

        //    const saltRound=  10;
        //    const hash_password= await bcrypt.hash(password,saltRound);

        const userCreated = await User.create({ employmentEndDate,educationQualification,skills,employmentStartDate,workHistory,isAdmin,jobDescription,jobTitle,currentEmployer,country,linkdInLink,ZIPCode,state,city, lastName,firstName,middleName,countryCode, email, phone, password, dob, streetAddress,image });
        response.status(200).send({ msg: "Registration successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString() });

    } catch (error) {
        // response.status(400).send({"message":"page not found"});
        next(error);
    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return response.status(400).json({ message: "Invalid Credentials." });
        }

        const isPasswordValid = await userExist.passwordCompare(password);

        if (isPasswordValid) {
            response.status(200).send({ msg: "Login successfull", token: await userExist.generateToken(), userId: userExist._id.toString() });
        } else {
            response.status(401).json({ msg: "Invalid Credentials." })
        }


    } catch (error) {
        response.status(400).send({"message":"page not found"});
        // next(error);
    }
}



const user = async (request, response) => {
    try {
        const userData = request.user;
        console.log(userData);
        return response.status(200).json({ msg: userData });
    } catch (error) {
        console.error(`error from the user route${error}`)
    }
}


const userUpdate = async (request, response) => {
    try {
        const {_id, employmentEndDate,educationQualification,skills,employmentStartDate,jobDescription,jobTitle,currentEmployer,country,ZIPCode,state,city, lastName,firstName,middleName,countryCode,linkdInLink,dob, email, phone, streetAddress,image,workHistory } = request.body;
        const userExist = await User.findOne({ _id:_id });
        if (!userExist) {
            return response.status(400).json({ msg: "User not exists." });
        }
        // if(assignedProject){
        //     const userUpdatedAssignedProject = await User.updateOne({_id:_id},{ $push: { assignedProject: assignedProject }});
        //     response.status(200).send({ msg: "Project assigned successfull"});
        // }else{
            const userUpdated = await User.updateOne({_id:_id},{$set:{skills:skills,employmentEndDate:employmentEndDate,employmentStartDate:employmentStartDate,jobDescription:jobDescription,jobTitle:jobTitle,educationQualification:educationQualification,currentEmployer:currentEmployer,country:country,ZIPCode:ZIPCode,state:state,city:city, lastName:lastName,firstName:firstName,middleName:middleName,countryCode:countryCode, email:email, phone:phone, dob:dob,image:image,linkdInLink:linkdInLink,streetAddress:streetAddress,workHistory:workHistory }});
        
        // console.log(userData);
        response.status(200).send({ msg: "Update successfull"});
        // }
        
        
        
        
    } catch (error) {
        console.error(`error from the user route${error}`);
        response.status(400).send({"message":error});
    }
}



module.exports = { home, register, login, user,userUpdate };