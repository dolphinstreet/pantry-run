const mongoose = require("mongoose");

function cleanIngredient(ingredient) {
    if (ingredient.category) {
        if (ingredient.category instanceof String) {
            if (!mongoose.Types.ObjectId.isValid(ingredient.category)) {
                delete ingredient.category;
            }
        } else if (
            ingredient.category._id &&
            !mongoose.Types.ObjectId.isValid(ingredient.category._id)
        ) {
            delete ingredient.category;
        } else {
            delete ingredient.category;
        }
    }
    if (ingredient._id && !mongoose.Types.ObjectId.isValid(ingredient._id)) {
        delete ingredient._id;
    }
    if (!ingredient.name && !ingredient._id) {
        return null;
    }
    return ingredient;
}

module.exports = cleanIngredient;
