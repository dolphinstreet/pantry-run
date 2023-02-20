const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Recipe model to whatever makes sense in this case
const recipeSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: false,
    },
    recipeLink: {
        type: String,
        trim: true
    },
    photo: String,
    rows: [{
        amount: Number,
        unit: {
            type: String,
            enum: ["", "kg", "g", "L", "mL"],
            default: ""
        },
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: "Ingredient",
            required: true
        }
    }],
    steps: {
        name: String,
        description: String
    },
    tags: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Tag",
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

function arrayLimit(val) {
    return val.length <= 5;
}

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
