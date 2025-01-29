import userModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import roleModel from "../models/Roles.js";


class UserController {
  // signup user
  static signUp = async (req, res) => {
    const { firstname, lastname, email, contactNo, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      res.send({ code: "failed", message: "user already exist" });
    } else {
      if (firstname && lastname && email && contactNo && password) {
        try {
          const customer = await roleModel.findOne({roleName:"customer"})
        

          const newUser = new userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contactNo: contactNo,
            password: password,
            roleId: customer._id,
          });
          await newUser.save();

          const saved_user = userModel.findOne({ email: email });
          const token = jwt.sign(
            { userId: saved_user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.send({
            code: "success",
            message: "User Created Succesfully",
            token: token,
          });
        } catch (error) {
          console.log(error);
          res.send({ code: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({ code: "failed", message: "All Feilds are required" });
      }
    }
  };

  // login
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user) {
          // const isMatch = await bcrypt.compare(password, user.password);
          const isMatch = password === user.password;
          if (isMatch) {
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              { expiresIn: "5d" }
            );
            res.send({
              code: "Success",
              token: token,
              message: "Login Successfully",
            });
          } else {
            res.send({
              code: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            code: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ code: "failed", message: "email Or Password Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ code: "failed", message: "Unable to Login" });
    }
  };

  // lOGGED USER DETAILS
  static loggedUser = async (req, res) => {
    console.log("loged user called");
    res.send({
      user: req?.user,
      userCurrentPlan: req?.userCurrentPlan,
      userAccess: req?.userAccess,
    });
  };

  static registerAdmin = async (req, res) => {
    const { firstname, lastname, email, contactNo, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      res.send({ code: "failed", message: "user already exist" });
    } else {
      if (firstname && lastname && email && contactNo && password) {
        try {
          const admin = await roleModel.findOne({roleName:"admin"})
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const newUser = new userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contactNo: contactNo,
            password: password,
            roleId: admin._id,
          });
          await newUser.save();

          const saved_user = userModel.findOne({ email: email });
          const token = jwt.sign(
            { userId: saved_user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.send({
            code: "success",
            message: "admin Created Succesfully",
            token: token,
          });
        } catch (error) {
          console.log(error);
          res.send({ code: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({ code: "failed", message: "All Feilds are required" });
      }
    }
  };
}

export default UserController;
