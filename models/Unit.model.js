const { Schema, model } = require("mongoose");

// Unit model
const unitSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    user: Schema.Types.ObjectId,
});

const Unit = model("Unit", unitSchema);

module.exports = Unit;
