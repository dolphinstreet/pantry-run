const seedUsers = require("./user.seeds");
const Tag = require("../../models/Tag.model");
const User = require("../../models/User.model");

const tags = ["Dinner", "Lunch", "Breakfast", "Italian"];

const seedTags = async () => {
    try {
        if ((await Tag.count()) > 0) {
            console.log("Aborting: Tags are already seeded");
            return;
        }

        seedUsers();

        const createdTags = await Tag.create(dbReady);
        console.log(`Created ${createdTags.length} tags`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Tags: ${error.message}`
        );
    }
};

module.exports = seedTags;
