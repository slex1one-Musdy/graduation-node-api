const multer = require("multer");
const CustomError = require("../Helpers/CustomError");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const randomUniqueIDGenerator = () => {
    return Date.now().toString() + uuidv4();
};

//multers disk storage setting //KAYIT AYARLARI / KAYDETME AYARLARI
const storage = multer.diskStorage({
    //DETERMINES THE FILE NAME (best choice is give names according to user id)

    filename: function(req, file, cb) {
        req.profileImage = file.fieldname + randomUniqueIDGenerator();

        cb(null, req.profileImage); //user id olsun resimlerin adlari
    },
});

//Multer Settings //MULTER AYARLARI / FILTRELEME vs
const upload = multer({
    storage: storage,

    //Restrict the file extension (png,jpeg,jpg and giff only valid ones)
    fileFilter: function(req, file, cb) {
        //Declaring the extension of the file
        //path.extname => Returns the file extension no matter how long the file root is. (e.g C:/deneme/users/uploads/deneme.js) => .js
        const extension = path.extname(file.originalname);
        const validExtensions = [".png", ".jpeg", ".jpg", ".gif"];
        if (!validExtensions.includes(extension)) {
            return cb(
                new CustomError("Please provide valid image extension.", 400),
                false
            );
        } else {
            return cb(null, true);
        }
    },
});

module.exports = {
    //Middleware
    profileImageUpload: multer(upload),
};