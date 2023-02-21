const Recipe = require("../../models/Recipe.model");

const recipes = [
    {
        name: "Lasagnes: la meilleure recette",
        serves: 6,
        Photo: "/images/lasagna.webp",
        recipeLink:
            "https://cuisine.journaldesfemmes.fr/recette/313738-lasagnes-a-la-bolognaise",
        rows: [
            { amount: 8, ingredient: "Plaque de lasagnes" },
            {
                amount: 800,
                unit: "g",
                ingredient: "Pulpe de tomate en conserve",
            },
            { amount: 300, unit: "g", ingredient: "Boeuf hachée" },
            { amount: 1, ingredient: "Oignon" },
            { amount: 1, unit: "gousse", ingredient: "Ail" },
            { amount: 2, unit: "c à s", ingredient: "Huile d'olive" },
            { amount: 1, unit: "c à s", ingredient: "origan" },
            { amount: 100, unit: "g", ingredient: "Emmental râpé" },
            { amount: 2, unit: "morceaux", ingredient: "Sucre" },
            { ingredient: "Sel" },
            { ingredient: "Poivre" },
            { amount: 70, unit: "g", ingredient: "Beurre" },
            { amount: 70, unit: "g", ingredient: "Farine" },
            { amount: 50, unit: "cl", ingredient: "Lait" },
            { amount: 1, unit: "pincée", ingredient: "Noix de muscade" },
        ],
        steps: [
            {
                description:
                    "Couper un oignon et une gousse d'ail en petit morceaux. Les faire revenir à feu doux dans une casserole ou une sauteuse avec une cuillère à soupe d'huile d'olive, jusqu'à ce que les oignons soient devenus un peu translucides. Afin d'exhaler les saveurs de l'oignon, démarrer la cuisson à feu vif pendant 1 à 2 minutes. Puis baisser le feu juste après pour ne pas que les oignons ne brûlent.",
            },
            {
                description:
                    "Une fois que les oignons ont pris une jolie couleur dorée, ajouter 800 g de pulpe de tomate. Saler, poivrer et ajouter une bonne cuillère à soupe d'herbes aromatiques (au choix : origan, basilic, thym). Laisser réduire et mijoter à feu doux pendant 20 minutes, avant de mixer ou non selon les goûts. Contrairement aux tomates fraîches, la pulpe en conserve étant plutôt acide, penser à ajouter 2 morceaux de sucre pour adoucir la sauce.",
            },
            {
                description:
                    "Pendant que la sauce mijote, faire chauffer un peu d'huile d'olive dans une poêle pour y faire revenir 300 g de viande de bœuf hachée à feu moyen pendant 3 à 5 minutes. Saler et poivrer, puis la mélanger à la sauce tomate réservée. Penser à dégraisser la viande avant de la mélanger à la sauce tomate. Pour cela, retirer la viande à l'aide d'une écumoire.",
            },
            {
                description:
                    "Dans une casserole, faire fondre 70 g de beurre, et ajouter la même quantité de farine hors du feu. Mélanger pour que le beurre soit absorbé. Ajouter 50 cl de lait très progressivement en mélangeant pour empêcher la formation de grumeaux. Replacer sur feu doux et laisser épaissir pendant quelques minutes. Saler, poivrer et ajouter une bonne pincée de noix de muscade.",
            },
            {
                description:
                    "Beurrer un plat, et y déposer une couche de béchamel, puis une couche de lasagnes, et une de sauce tomate à la viande parsemée d'emmental râpé. Répéter l'opération jusqu'à épuisement des ingrédients en terminant par de la béchamel, et saupoudrer avec du parmesan râpé. Les amateurs peuvent aussi ajouter des lamelles de champignons de Paris au moment du montage.",
            },
            {
                name: "Pour finir",
                description:
                    "Enfourner à four préchauffé à 165°c (thermostat 5/6) pendant 45 minutes environ, pour que les lasagnes soient bien gratinées. Si les lasagnes gratinent trop vite, les recouvrir de papier d'aluminium.",
            },
        ],
        tags: ["italian", "dinner", "pasta"],
    },
    {
        title: "Véritable Chili con carne",
        serves: 4,
        photo: "images/chili-con-carne.webp",
        rows: [
            { amount: 300, unit: "g", ingredient: "Haricot rouge" },
            { amount: 2, ingredient: "Oignon" },
            { amount: 600, unit: "g", ingredient: "Boeuf hâchée" },
            { amount: 2, ingredient: "Tomate" },
            { amount: 2, unit: "gousses", ingredient: "Ail" },
            { amount: 0.5, unit: "c à c", ingredient: "Piment" },
            { amount: 25, unit: "cl", ingredient: "Jus de tomate" },
            { amount: 2, unit: "c à c", ingredient: "Cumin" },
            { amount: 1, unit: "c à s", ingredient: "Origan séché" },
            { ingredient: "Tabasco" },
            { ingredient: "Huile d'olive" },
            { ingredient: "Sel" },
            { ingredient: "Poivre" },
        ],
        steps: [
            {
                description:
                    "Faire tremper les haricots pendants 12 heures dans de l'eau froide. Mettre les haricots dans une cocotte remplie d'eau froide.",
            },
            {
                description:
                    "Les cuire 1 heure et demi à petits bouillon puis salez.",
            },
            {
                description:
                    "Pendant ce temps hacher les oignons et l'ail et faire revenir dans une cocotte avec l'huile, jusqu’à qu’ils deviennent translucides.",
            },
            {
                description:
                    "Ajouter la viande hachée, mélanger et remuer sur feu moyen. Ajouter les tomates mondées, épépinées et coupées en dés, le piment, l’origan, le cumin et le piment. Ajouter le jus de tomates et laisser mijoter 5 minutes.",
            },
            {
                description:
                    "Égoutter les haricots et les ajouter au mélange. Mélanger et laisser cuire 20 min à feu doux.",
            },
            {
                name: "Pour finir",
                description:
                    "Rectifier l'assaisonnement selon votre goût et servez.",
            },
        ],
        tags: ["dinner", "ricebowl", "mexican"],
    },
];

const seedRecipes = async () => {
    if (Recipe.count()) {
        return;
    }

    seedUsers();
    seedIngredients();
    seedUnits();
    const createdRecipes = await Recipe.create(recipes);
    console.log(`Created ${createdRecipes.length} recipes`);
};

module.exports = seedRecipes;
