const openConnection = require("../../db/");
const mongoose = require("mongoose");
const seedUsers = require("./user.seeds");
const seedCategories = require("./category.seeds");
const seedUnits = require("./unit.seeds");

async function seedDatabase() {
    try {
        const db = await openConnection();
        console.log(`Succesfully connected to ${db.connection.name} database.`);

        await seedCategories();
        await seedUnits();
        await seedUsers();

        await mongoose.disconnect();
        console.log(`Succesfully disconnected from ${db.connection.name}`);
    } catch (error) {
        console.error(
            `Something went wrong while creating the seed: ${error.message}`
        );
    }
}

seedDatabase();
