const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "static/imageUploaded");
    },
    filename: (req, file, cb) => {
        const newFileName = file.originalname;
        cb(null, newFileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) != ".jpg")
            return cb(new Error("Invalid Extension", false));

        cb(false, true);
    },
});

module.exports = upload;
