const cleanUnit = require("./unit.cleaner");
const cleanIngredient = require("./ingredient.cleaner");
const { createOrUpdateUnit } = require("../../../utils/unit");
const { createOrUpdateIngredient } = require("../../../utils/ingredient");

const cleanListForUpdate = async (req, res, next) => {
    try {
        if (req.body._id) {
            // clean id
        }
        if (req.body.name) {
            // clean name
        }

        if (req.body.rows) {
            for (row of req.body.rows) {
                if (!row.amount) {
                    row.amount = 0;
                }
                row.unit = cleanUnit(row.unit);

                if (row.unit) {
                    row.unit = await createOrUpdateUnit(row.unit);
                    if (row.unit) {
                        row.unit = row.unit.id;
                    }
                }
                if ("unit" in row && !row.unit) {
                    delete row.unit;
                }

                row.ingredient = cleanIngredient(row.ingredient);
                if (row.ingredient) {
                    row.ingredient = await createOrUpdateIngredient(
                        row.ingredient
                    );
                    if (row.ingredient) {
                        row.ingredient = row.ingredient.id;
                    }
                }
                if ("ingredient" in row && !row.ingredient) {
                    delete row.ingredient;
                }
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
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    cleanListForUpdate,
};
