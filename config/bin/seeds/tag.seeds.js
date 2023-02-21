const Tag = require("../../models/Tag.model");

const tags = ["Dinner", "Lunch", "Breakfast", "Italian"];

const seedTags = async () => {
    if (Tag.count()) {
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
};

module.exports = seedTags;
