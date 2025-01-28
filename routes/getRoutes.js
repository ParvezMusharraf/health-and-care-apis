import express from "express";
import getController from "../controllers/getController.js";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middleware/auth-middleware.js";

const router = express.Router()

router.get("/AllDocters",getController.getAllDocters)
router.get("/getconfig", checkUserAuth, UserController.loggedUser);
router.get("/AllSpecility",getController.getAllSpeciality)
router.get("/AllDepartment",getController.getAllDepartments)
router.get("/AllAppointment",checkUserAuth ,getController.getAllAppointments)
router.get("/AllStatus",getController.getAllStatus)


export default router;
