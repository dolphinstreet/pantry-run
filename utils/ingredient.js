const Ingredient = require("../models/Ingredient.model");
const mongoose = require("mongoose");

async function createOrUpdateIngredient(ingredient) {
    try {
        if (ingredient._id) {
            const updatedIngredient = await Ingredient.findByIdAndUpdate(
                ingredient._id,
                { ingredient }
            );
            if (updatedIngredient) {
                return updatedIngredient;
            }
            delete ingredient._id;
        }
        const existingIngredient = await Ingredient.find({
            name: { $regex: new RegExp(ingredient.name, "i") },
        });
        if (existingIngredient) {
            existingIngredient.name = ingredient.name;
            existingIngredient.category = ingredient.category;
            await existingIngredient.save();
            return existingIngredient;
        } else {
            const newIngredient = await Ingredient.create({ ingredient });
            return newIngredient;
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

module.exports = { createOrUpdateIngredient };
