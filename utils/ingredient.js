const Ingredient = require("../models/Ingredient.model");
const mongoose = require("mongoose");

async function updateIngredients(ingredient) {
    try {
        if (!ingredient.name) {
            return null;
        }
        const existingIngredient = await Ingredient.findOne({
            name: { $regex: new RegExp(ingredient.name, "i") },
        });
        if (existingIngredient) {
            return existingIngredient;
        } else {
            if ("_id" in ingredient) {
                delete ingredient["_id"];
            }
            const newIngredient = await Ingredient.create(ingredient);
            console.log("new ingredient", newIngredient);
            return newIngredient;
        }
    } catch (error) {
        console.error("error during unit create", error.message);
        throw error;
    }
}

module.exports = { updateIngredients };
