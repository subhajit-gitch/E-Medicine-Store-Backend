//loading the multer module
const multer = require("multer")

const uploadStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
    destination: './public/uploads/'
})

const singleUpload = multer({ storage: uploadStorage })

module.exports = singleUpload;

console.log('multer is ready to use')