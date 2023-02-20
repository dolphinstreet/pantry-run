const { Schema, model } = require("mongoose");

// Ingredient model
const ingredientSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        trim: true,
    }
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
