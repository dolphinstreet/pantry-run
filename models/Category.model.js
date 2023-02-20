const { Schema, model } = require("mongoose");

// Category model
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: false,
        trim: true
    }
});

const Category = model("Category", categorySchema);

module.exports = Category;
