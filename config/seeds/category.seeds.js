const Category = require("../../models/Category.model");

const categories = [
    { name: "Alchool" },
    { name: "Baby" },
    { name: "Bakery" },
    { name: "Beverages" },
    { name: "Breakfast & Cereals" },
    { name: "Condiments & Dressings" },
    { name: "Cooking & Baking" },
    { name: "Dairy" },
    { name: "Deli" },
    { name: "Frozen foods" },
    { name: "Fresh produce" },
    { name: "Grain, pasta & sides" },
    { name: "Health & Personal Care" },
    { name: "Household & cleaning" },
    { name: "Meat" },
    { name: "Pet supplies" },
    { name: "Seafood" },
    { name: "Snacks" },
    { name: "Soups & canned goods" },
    { name: "Spices" },
    { name: "Other" },
];

const seedCategories = async () => {
    try {
        if (Category.count() > 0) {
            console.log("Categories already seeded, nothing to do here");
            return;
        }

        const createdCategories = await Category.create(categories);
        console.log(`Created ${createdCategories.length} categories`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Categories: ${error.message}`
        );
    }
};

module.exports = seedCategories;
