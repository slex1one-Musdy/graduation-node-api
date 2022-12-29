const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/auth");
const { profileImageUpload } = require("../Helpers/multer");
const { verifyJWT } = require("../Middlewares/auth");
authRouter.post(
    "/register",
    profileImageUpload.single("profileImage"),
    authController.register
);
authRouter.post("/login", authController.login);
authRouter.get("/logout", verifyJWT, authController.logout);

module.exports = authRouter;