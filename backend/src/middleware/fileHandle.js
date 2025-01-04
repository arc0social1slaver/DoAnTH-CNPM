const util = require("util");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./public")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({
    storage: storage,
})
const uploadOneFileAction = util.promisify(upload.single("file"));
const deleteAction = util.promisify(fs.unlink);
module.exports = {
    uploadOneFileAction,
    deleteAction,
}