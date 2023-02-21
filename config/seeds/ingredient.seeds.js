const Ingredient = require("../../models/Ingredient.model");
const seedCategories = require("./category.seeds");
const Category = require("../../models/Category.model");

const ingredients = [
    {
        name: "Tomatoes",
        category: "Fresh produce",
    },
    {
        name: "Onions",
        category: "Fresh produce",
    },
    {
        name: "Carrots",
        category: "Fresh produce",
    },
    {
        name: "Potatoes",
        category: "Fresh produce",
    },
    {
        name: "Apples",
        category: "Fresh produce",
    },
    {
        name: "Oranges",
        category: "Fresh produce",
    },
    {
        name: "Bananas",
        category: "Fresh produce",
    },
    {
        name: "Spaghetti",
        category: "Grain, pasta & sides",
    },
    {
        name: "Lasagna sheets",
        category: "Grain, pasta & sides",
    },
    {
        name: "Rice",
        category: "Grain, pasta & sides",
    },
    {
        name: "Salt",
        category: "Spices",
    },
    {
        name: "Pepper",
        category: "Spices",
    },
    {
        name: "Toilet Paper",
        category: "Household & cleaning",
    },
    { name: "Ail", category: "Fresh Produce" },
    { name: "Beurre", category: "Dairy" },
    { name: "Boeuf hachée", category: "Meat" },
    { name: "Cumin", category: "Spices" },
    { name: "Emmental râpé", category: "Dairy" },
    { name: "Farine", category: "Cooking & Baking" },
    { name: "Haricot rouge", category: "Soups & canned goods" },
    { name: "Huile d'olive", category: "Condiments & Dressings" },
    { name: "Jus de tomate", category: "Beverages" },
    { name: "Lait", category: "Dairy" },
    { name: "Noix de muscade", category: "Spices" },
    { name: "Oignon", category: "Fresh produce" },
    { name: "Origan séché", category: "Spices" },
    { name: "origan", category: "Fresh produce" },
    { name: "Piment", category: "Fresh produce" },
    { name: "Plaque de lasagnes", category: "Grain, pasta & sides" },
    { name: "Poivre", category: "Spices" },
    { name: "Pulpe de tomate en conserve", category: "Soups & canned goods" },
    { name: "Sel", category: "Spices" },
    { name: "Sucre", category: "Cooking & Baking" },
    { name: "Tabasco", category: "Condiments & Dressings" },
    { name: "Tomates", category: "Fresh produce" },
];

async function getCategoryIds(ingredients) {
    for (const ingredient of ingredients) {
        try {
            ingredient.category = await Category.findOne(
                { name: ingredient.category },
                { _id: 1 }
            ).exec();
        } catch (error) {
            console.log(
                `something went wrong while getting category ids for ingredients: ${error.message}`
            );
        }
    }
    return ingredients;
}

const seedIngredients = async () => {
    try {
        if ((await Ingredient.count()) > 0) {
            return;
        }

        const dbReady = await getCategoryIds(ingredients);
        const createdIngredients = await Ingredient.create(dbReady);
        console.log(`Created ${createdIngredients.length} ingredients`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Ingredients: ${error.message}`
        );
    }
};

module.exports = seedIngredients;
