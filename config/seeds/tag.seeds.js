const seedUsers = require("./user.seeds");
const Tag = require("../../models/Tag.model");

const tags = ["Dinner", "Lunch", "Breakfast", "Italian"];

const seedTags = async () => {
    try {
        if (Tag.count() > 0) {
            return;
        }

        seedUsers();

        user = User.findOne();
        tags = tags.map((tag, idx) => {
            return {
                name: tag,
                order: idx,
                user,
            };
        });

        const createdTags = await Tag.create(tags);
        console.log(`Created ${createdTags.length} tags`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Tags: ${error.message}`
        );
    }
};

module.exports = seedTags;
