const openConnection = require("../../db/");
const mongoose = require("mongoose");
const seedUsers = require("./user.seeds");
const seedCategories = require("./category.seeds");
const seedUnits = require("./unit.seeds");
const seedIngredients = require("./ingredient.seeds");
const seedTags = require("./tag.seeds");

async function seedDatabase() {
    try {
        require("dotenv").config();
        const db = await openConnection();

        console.log(`Succesfully connected to ${db.connection.name} database.`);

        await seedUsers();
        await seedCategories();
        await seedUnits();
        await seedIngredients();
        await seedTags();

        await mongoose.disconnect();
        console.log(`Succesfully disconnected from ${db.connection.name}`);
    } catch (error) {
        console.error(
            `Something went wrong while creating the seed: ${error.message}`
        );
    }
}

seedDatabase();
