const Ingredient = require("../../models/Ingredient.model");
const seedCategories = require("./category.seeds");

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

const seedIngredients = async () => {
    if (Ingredient.count()) {
        return;
    }

    seedCategories();
    const createdIngredients = await Ingredient.create(ingredients);
    console.log(`Created ${createdIngredients.length} ingredients`);
};

module.exports = seedIngredients;
