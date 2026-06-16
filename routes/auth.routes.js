import express from "express";
import { userSignUp, userLogin, userLogout, userProfileUpdate } from "../controllers/user.controller.js";
import { approveUserEmailID } from "../controllers/admin.controller.js";
import { isAuthenticated, isSuperAdminAuthenticated } from "../middlewares/authentication.middleware.js";
import { loginVerification } from "../middlewares/passport.js";

const authRoutes = express.Router();

authRoutes.route("/signup").post(userSignUp);
authRoutes.route("/login").post(loginVerification, userLogin);
authRoutes.route("/logout").get(userLogout);
authRoutes.route("/profile/update").post(isAuthenticated, userProfileUpdate);
authRoutes.route("/approveUserAccount").post(isSuperAdminAuthenticated, approveUserEmailID);
authRoutes.route("/referallCodeAccountActivation").post(isAuthenticated, approveUserEmailID);

export default authRoutes;