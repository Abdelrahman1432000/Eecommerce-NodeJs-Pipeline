const handlerAsync = require('../middleware/handlerAsync')
const multer = require('multer')

const multerStorage = multer.memoryStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/product/')
    },
    filename:(req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,`products_${req.user._id}_${Date.now()}_.${ext}`)
    }
})

const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error("Must Be Upload type of Image"),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})


exports.uploadArrayofImage = upload.array('images');


exports.addProduct = handlerAsync(async (req,res,next)=>{
    
    res.json({})
})