const Project = require("../models/project-models");




const createProject = async (request, response) => {
    try {


        const data = request.body;
        // console.log("The json project list data = "+JSON.stringify(data[0]));
        const allProject = await Project.find({}, { "ID": 1, "_id": 0 });
        const arrayOfId = allProject.map(element => element.ID);
        let isAllProjectExists = true;
        await Promise.all(data.map(async (element) => {
            if (arrayOfId.includes(element.ID)) {
                console.log("The existing project id = " + element.ID);
                return;
            }
            else {
                await Project.create(element);
                console.log("The created project id = " + element.ID);
                isAllProjectExists = false;
            }
        }));
        if (isAllProjectExists) {
            response.status(200).send({ msg: "This project are already exists!!!Try again" });
        } else {
            response.status(200).send({ msg: "Project created successfull!!!" });
        }


    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        // next(error);
    }
}


const retriveProject = async (request, response) => {
    try {

        const allProjectData = await Project.find();
        response.status(200).send({ msg: "Project created successfull", data: allProjectData });

    } catch (error) {
        response.status(400).send({ "message": "page not found" });
        // next(error);
    }
}

module.exports = { createProject, retriveProject };

