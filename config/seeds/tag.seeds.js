const seedUsers = require("./user.seeds");
const Tag = require("../../models/Tag.model");
const { addUser } = require("./utils");

let tags = [
    { name: "Dinner", order: 1 },
    { name: "Lunch", order: 2 },
    { name: "Breakfast", order: 3 },
    { name: "Italian", order: 4 },
];

const seedTags = async () => {
    try {
        if ((await Tag.count()) > 0) {
            console.log("Aborting: Tags are already seeded");
            return;
        }

        await seedUsers();
        tags = await addUser(tags);

        const createdTags = await Tag.create(tags);
        console.log(`Created ${createdTags.length} tags`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Tags: ${error.message}`
        );
    }
};

module.exports = seedTags;
