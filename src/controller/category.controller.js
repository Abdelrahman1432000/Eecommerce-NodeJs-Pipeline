const multer = require('multer');
const fs = require('fs');

const handlerAsync = require('../middleware/handlerAsync')
const categoryModel = require('../model/categoryModel');

const multerStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/category')
    },
    filename:(req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,`cateogries_${req.user._id}_${Date.now()}_.${ext}`)
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


exports.uploadImage = upload.single('image');


exports.addCateogry = handlerAsync(async (req,res,next) => {
    const category = await categoryModel.create({
        name:req.body.name,
        image:req.file.filename,
        createdBy: req.user._id
    })

    res.status(201).json({
        message:"Created",
        category
    })
})

exports.getAllCategory = handlerAsync(async (req,res,next)=>{
    const categories = await categoryModel.find();
    res.json({
        categories
    })
});


exports.getSpecificCategory = handlerAsync(async (req,res,next)=>{
    const id = req.params.id;

    const category = await categoryModel.findById(id)

    res.json({
        category
    })
})

exports.updateCategory = handlerAsync(async (req,res,next)=> {
    const category = await categoryModel.findById(req.params.id);
    if(req.file){
        if(fs.existsSync(`uploads/category/${category.image}`)){
            fs.unlinkSync(`uploads/category/${category.image}`)
        }
        await categoryModel.findByIdAndUpdate(category._id,{
            name:req.body.name,
            image:req.file.filename
        },{runValidators: true})
    }else{
        await categoryModel.findByIdAndUpdate(category._id,{
            name:req.body.name,
        })
    }

    res.status(202).json({
        message:"Category Updated"
    });
});


exports.deleteCategory = handlerAsync(async (req,res,next)=>{
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    fs.unlinkSync(`uploads/category/${category.image}`)
    res.status(204).json({})
});