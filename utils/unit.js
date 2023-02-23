const Unit = require("../models/Unit.model");

async function createOrUpdateUnit(unit) {
    try {
        if (unit._id && mongoose.Types.ObjectId.isValid(unit._id)) {
            const updatedUnit = await Unit.findByIdAndUpdate(unit._id, {
                unit,
            });
            if (updatedUnit) {
                return updatedUnit;
            }
        }
    } catch (error) {
        console.error("error during unit create", error.message);
        return null;
    }
    try {
        const existingUnit = await Unit.findOne({
            name: { $regex: new RegExp(unit.name, "i") },
        });
        if (existingUnit) {
            return existingUnit;
        } else {
            const newUnit = await Unit.create({ unit });
            return newUnit;
        }
    } catch (error) {
        console.error("error during unit update", error.message);
        return null;
    }
}

module.exports = { createOrUpdateUnit };
