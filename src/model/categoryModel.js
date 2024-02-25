const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category must have a name"],
        minlength: 3,
        unique: true,
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
