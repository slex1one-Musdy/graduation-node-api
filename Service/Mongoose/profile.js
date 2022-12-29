const Profile = require("../../Models/Mongoose/Profile");
const User = require("../../Models/Mongoose/User");
const Staff = require("../../Models/Mongoose/Staff");
const Student = require("../../Models/Mongoose/Student");

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
    editProfile: async(req) => {},
};

/*
todo: create post model with routes + controller + service

*/