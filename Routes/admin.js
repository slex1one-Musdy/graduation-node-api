const express = require("express");
const adminRouter = express.Router();
const { profileImageUpload } = require("../Helpers/multer");
const adminController = require("../Controllers/admin");

adminRouter.get("/users", adminController.getAllUsers);
adminRouter.put(
    "/toggle-activation-user/:id",
    adminController.toggleAccountActivation
);
adminRouter.put(
    "/update-user/:id",
    profileImageUpload.single("profileImage"),
    adminController.updateUser
);
adminRouter.delete("/remove-user/:id", adminController.removeUser);

module.exports = adminRouter;