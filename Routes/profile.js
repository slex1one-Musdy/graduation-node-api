const express = require("express");
const profileRouter = express.Router();
const { profileImageUpload } = require("../Helpers/multer");
const profileController = require("../Controllers/profile");

profileRouter.get("/", profileController.getMyProfile);
profileRouter.get("/me", profileController.getMyProfile);
profileRouter.put(
    "/edit",
    profileImageUpload.single("profileImage"),
    profileController.editMyProfile
);

module.exports = profileRouter;