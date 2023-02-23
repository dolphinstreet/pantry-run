const cleanUnit = require("./unit.cleaner");
const cleanIngredient = require("./ingredient.cleaner");
const { updateUnits } = require("../../../utils/unit");
const { updateIngredients } = require("../../../utils/ingredient");
const { default: mongoose } = require("mongoose");

const cleanList = async (req, res, next) => {
    try {
        if ("_id" in req.body) {
            if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
                return res.status(400).send("invalid request");
            }
        }
        if (req.body.name) {
            // clean name
        }

        if (req.body.rows) {
            const cleanRows = [];

            for (row of req.body.rows) {
                if (!row.amount) {
                    row.amount = 0;
                }
                row.unit = cleanUnit(row.unit);

                if (row.unit) {
                    row.unit = await updateUnits(row.unit);
                    if (row.unit) {
                        row.unit = row.unit.id;
                    } else {
                        delete row.unit;
                    }
                }
                if ("unit" in row && !row.unit) {
                    delete row.unit;
                }

                row.ingredient = cleanIngredient(row.ingredient);
                if (row.ingredient) {
                    row.ingredient = await updateIngredients(row.ingredient);
                    if (row.ingredient) {
                        row.ingredient = row.ingredient.id;
                        cleanRows.push(row);
                    }
                }
            }
            req.body.rows = cleanRows;
        }

        if (req.body.favorite !== undefined) {
            // alter favorite
        }

        if ("user" in req.body) {
            delete req.body.user;
        }
        next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    cleanList,
};
