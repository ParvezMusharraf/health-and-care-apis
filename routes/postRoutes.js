import express from "express";
import postController from '../controllers/postController.js'
import checkUserAuth from "../middleware/auth-middleware.js";


const router = express.Router()


router.post("/UserRoles",postController.postRoles)
router.post("/SaveDocter",postController.saveDocter)
router.post("/SaveSpaciality",postController.saveSpeciality)
router.post("/SaveDepartment",postController.saveDepartment)
router.post("/SaveStatus",postController.saveStatus)
router.post("/Saveappointment",checkUserAuth,postController.saveAppointment)


export default router;
