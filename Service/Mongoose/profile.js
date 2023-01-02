const Profile = require("../../Models/Mongoose/Profile");
const Staff = require("../../Models/Mongoose/Staff");
const Student = require("../../Models/Mongoose/Student");
const { options, cloudinary } = require("../../Config/cloudinaryConfig");
const User = require("../../Models/Mongoose/User");


module.exports = {
    myProfile: async(req) => {
        let profileDetails = {};
        const profile = await Profile.findOne({
            userId: req.user.id,
        }).populate("userId");

        if (profile.userId.userType == "student") {
            profileDetails = {
                profile,
                personalDetails: await Student.findOne({
                    userId: profile.userId._id,
                }),
            };
        }
        if (profile.userId.userType == "staff") {
            profileDetails = {
                profile,
                personalDetails: await Staff.findOne({
                    userId: profile.userId._id,
                }),
            };
        }

        return { success: true, profileDetails };
    },
    allProfiles: async(req) => {
        const profiles = await Profile.find({});
        return { success: true, profiles };
    },
    editProfile: async(req) => {
        //update fields
        let updateFields = {};
        if (req.body.description) updateFields.description = req.body.description;

        if (req.files["coverImage"] && req.files["coverImage"][0].path != "") {
            const updatedCoverImage = await cloudinary.uploader.upload(
                req.files["coverImage"][0].path, {...options, folder: "GraduationProject/CoverImages" }
            );

            const coverImage =
                process.env.NODE_ENV == "development" ?
                updatedCoverImage.url :
                updatedCoverImage.secure_url;
            updateFields.coverImage = coverImage;
            await Profile.findOneAndUpdate({ userId: req.currentUser.id }, {...updateFields }, { new: true });
        }

        if (req.files["profileImage"] && req.files["profileImage"][0].path != "") {
            const updatedProfileImage = await cloudinary.uploader.upload(
                req.files["profileImage"][0].path, {...options, folder: "GraduationProject/ProfileImages" }
            );
            const profileImage =
                process.env.NODE_ENV == "development" ?
                updatedProfileImage.url :
                updatedProfileImage.secure_url;
            await User.findByIdAndUpdate(
                req.currentUser.id, {
                    profileImage: profileImage,
                }, { new: true }
            );
        }

        return {
            success: true,
            message: "Your profile updated successfully.",
        };
    },
};

/*
todo: create post model with routes + controller + service

*/