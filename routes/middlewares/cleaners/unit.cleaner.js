const mongoose = require("mongoose");

function cleanUnit(unit) {
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
}

module.exports = cleanUnit;
