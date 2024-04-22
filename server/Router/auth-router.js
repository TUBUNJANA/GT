const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller")
const scheduleController = require("../controllers/schedule-controller")
const projectController = require("../controllers/project-controller")
const assignedProject = require("../controllers/assigned-project-controller")
const timeLog = require("../controllers/time-log-controller")
const authMiddleWare = require("../error/auth-middleware")


router.route("/").get(authController.home);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/user").get(authMiddleWare, authController.user);
router.route("/userUpdate").put(authMiddleWare, authController.userUpdate);
router.route("/createSchedule").post(authMiddleWare, scheduleController.createSchedule);
router.route("/retriveSchedule").get(authMiddleWare, scheduleController.retriveSchedule);
router.route("/updateSchedule").put(authMiddleWare, scheduleController.updateSchedule);
router.route("/deleteSchedule").delete(authMiddleWare, scheduleController.deleteSchedule);
router.route("/projectCreation").post(projectController.createProject);
router.route("/allProject").get(projectController.retriveProject);
router.route("/assignedProject").post(authMiddleWare,assignedProject.assignProject);
router.route("/allAssignedProject").get(authMiddleWare,assignedProject.allProjectAssociateWithUser);
router.route("/allAssignProject").get(authMiddleWare,assignedProject.allAssignedProject);
router.route("/updateStatus").put(authMiddleWare,assignedProject.approvalRequest);
router.route("/timeLogCreation").post(authMiddleWare,timeLog.createTimelog);


module.exports = router;