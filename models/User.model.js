const { Schema, model } = require("mongoose");

// User model
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ""
    }
},
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    });

const User = model("User", userSchema);

module.exports = User;
