const { Schema, model } = require("mongoose");

// Recipe model
const recipeSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: false,
    },
    serves: {
        type: Number,
        required: true,
        default: 1,
    },
    recipeLink: {
        type: String,
        trim: true,
    },
    photo: String,
    rows: [
        {
            amount: Number,
            unit: {
                type: Schema.Types.ObjectId,
                ref: "Unit",
            },
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: "Ingredient",
                required: true,
            },
        },
    ],
    steps: {
        name: String,
        description: String,
    },
    tags: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

function arrayLimit(val) {
    return val.length <= 5;
}

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
