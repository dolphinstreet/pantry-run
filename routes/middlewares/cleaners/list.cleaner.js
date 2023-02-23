const cleanUnit = require("./unit.cleaner");
const cleanIngredient = require("./ingredient.cleaner");
const createOrUpdateUnit = require("../../../utils/unit");
const createOrUpdateIngredient = require("../../../utils/unit");

const cleanListForUpdate = async (req, res, next) => {
    if (req.body._id) {
        // clean id
    }
    if (req.body.name) {
        // clean name
    }

    if (req.body.rows) {
        for (row of rew.body.rows) {
            try {
                row.unit = cleanUnit(row.unit);
                if (row.unit) {
                    row.unit = await createOrUpdateUnit(unit);
                }
                if (!row.unit) {
                    delete row.unit;
                }
                row.unit = cleanIngredient(row.ingredient);
                if (row.ingredient) {
                    row.ingredient = await createOrUpdateIngredient(unit);
                }
                if (!row.ingedient) {
                    delete row.ingredient;
                }
            } catch (error) {}
        }
    }

    if (req.body.favorite !== undefined) {
        // alter favorite
    }

    if (req.body.template !== undefined) {
        delete req.body.template;
    }

    if (req.body.user) {
        delete req.body.user;
    }
    next();
};

module.exports = {
    cleanListForUpdate,
};
