import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";
import { UserAccessFunctions } from "../models/UserAccess.js";

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from header
      token = authorization.split(" ")[1];
      // Verify Token
      const user = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from Token
      req.user = await UserModel.findById(user.userId).select("-password");

      req.userAccess = await UserAccessFunctions.FindAllAccess({
        roleID: req.user.roleId,
      });

      return next();
    } catch (error) {
      return res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    return res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
