const { Schema, model } = require("mongoose");

// tag model
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

const Tag = model("Tag", tagSchema);

module.exports = Tag;
