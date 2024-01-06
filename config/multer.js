const multer = require('multer')
const path = require('path')

//storage
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,path.resolve(__dirname,'..','uploads'))
    },
    filename: function(req,file,cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//format filter
function fileFilter(req,file,cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null,true)
    } else {
        cb('Error: Only image files are allowed')
    }
}

//multer middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload