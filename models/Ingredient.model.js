const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Ingredient model to whatever makes sense in this case
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
