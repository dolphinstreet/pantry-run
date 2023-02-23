const Unit = require("../models/Unit.model");

async function updateUnits(unit) {
    try {
        if (!unit.name) {
            return null;
        }
        const existingUnit = await Unit.findOne({
            name: { $regex: new RegExp(`^${unit.name}$`, "i") },
        });
        if (existingUnit) {
            return existingUnit;
        } else {
            if ("_id" in unit) {
                delete unit["_id"];
            }
            const newUnit = await Unit.create(unit);
            return newUnit;
        }
    } catch (error) {
        console.error("error during unit create", error.message);
        throw error;
    }
}

module.exports = { updateUnits };
