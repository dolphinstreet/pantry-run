const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Ingredient model to whatever makes sense in this case
const tagSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: false,
    },
    color: {
        type: String,
        default: "#808080"
    },
    order: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

const Tag = model("Ingredient", tagSchema);

module.exports = Ingredient;
