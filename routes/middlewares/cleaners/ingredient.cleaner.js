const mongoose = require("mongoose");

function cleanIngredient(ingredient) {
    try {
        if (ingredient.category) {
            if (ingredient.category instanceof String) {
                if (!mongoose.Types.ObjectId.isValid(ingredient.category)) {
                    delete ingredient.category;
                }
            } else if (ingredient.category._id) {
                if (!mongoose.Types.ObjectId.isValid(ingredient.category._id)) {
                    delete ingredient.category;
                } else {
                    ingredient.category = ingredient.category._id;
                }
            } else {
                delete ingredient.category;
            }
        }
        if (
            ingredient._id &&
            !mongoose.Types.ObjectId.isValid(ingredient._id)
        ) {
            delete ingredient._id;
        }
        if (!ingredient.name && !ingredient._id) {
            return null;
        }
        return ingredient;
    } catch (error) {
        console.error("Error on ingredient cleanup: ", error.message);
        throw error;
    }
}

module.exports = cleanIngredient;
