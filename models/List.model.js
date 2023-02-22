const { Schema, model } = require("mongoose");

// List model
const listSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    template: Boolean,
    rows: [
        {
            amount: Number,
            checked: {
                type: Boolean,
                default: false,
            },
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
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const List = model("List", listSchema);

module.exports = List;
