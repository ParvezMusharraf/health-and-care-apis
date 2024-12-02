import express from "express";
import getController from "../controllers/getController.js";

const router = express.Router()

router.get("/AllDocters",getController.getAllDocters)
router.get("/AllSpecility",getController.getAllSpeciality)
router.get("/AllDepartment",getController.getAllDepartments)
router.get("/AllAppointment",getController.getAllAppointments)
router.get("/AllStatus",getController.getAllStatus)


export default router;
