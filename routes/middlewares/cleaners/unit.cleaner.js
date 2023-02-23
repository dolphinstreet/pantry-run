const mongoose = require("mongoose");

function cleanUnit(unit) {
    try {
        if (!unit) {
            return null;
        }
        if (unit.user && !mongoose.Types.ObjectId.isValid(unit.user)) {
            delete unit.user;
        }
        if (unit._id && !mongoose.Types.ObjectId.isValid(unit._id)) {
            delete unit._id;
        }
        if (!unit.name && !unit._id) {
            return null;
        }
        return unit;
    } catch (error) {
        console.error("error during cleanup on unit:", unit);
        throw error;
    }
}

module.exports = cleanUnit;
