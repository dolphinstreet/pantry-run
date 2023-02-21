const openConnection = require("../db/");
const mongoose = require("mongoose");

async function seedDatabase() {
    try {
        const db = await openConnection();
        console.log(`Succesfully connected to ${db.connection.name} database.`);

        await mongoose.disconnect();
        console.log(`Succesfully disconnected from ${db.connection.name}`);
    } catch (error) {
        console.error(
            `Something went wrong while creating the seed: ${error.message}`
        );
    }
}

seedDatabase();
