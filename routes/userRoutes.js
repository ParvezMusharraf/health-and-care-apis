import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router()
router.post("/signup",UserController.signUp)
router.post("/login",UserController.login)
router.post("/registerAdmin",UserController.registerAdmin)


export default router;
