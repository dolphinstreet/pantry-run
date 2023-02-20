const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Ingredient model to whatever makes sense in this case
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: false,
        trim: true
    }

});

const Category = model("Ingredient", categorySchema);

module.exports = Ingredient;
