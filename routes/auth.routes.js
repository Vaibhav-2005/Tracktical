import express from "express";
import { userSignUp, userLogin, userLogout, userProfileUpdate } from "../controllers/user.controller.js";
import { approveUserEmailID } from "../controllers/admin.controller.js";
import { isAuthenticated, isSuperAdminAuthenticated } from "../middlewares/isAuthenticated.js";

const authRoutes = express.Router();

authRoutes.route("/signup").post(userSignUp);
authRoutes.route("/login").post(userLogin);
authRoutes.route("/logout").get(userLogout);
authRoutes.route("/profile/update").post(isAuthenticated, userProfileUpdate);
authRoutes.route("/approveUserAccount").post(isSuperAdminAuthenticated, approveUserEmailID);

export default authRoutes;