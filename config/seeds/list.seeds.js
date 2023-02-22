const List = require("../../models/List.model");
const User = require("../../models/User.model");
const seedUsers = require("./user.seeds");
const seedUnits = require("./unit.seeds");
const seedIngredients = require("./ingredient.seeds");
const { addUser, fetchIdsForRows } = require("./utils");

const dummyLists = [
    {
        name: "Grocery List",
        favorite: true,
        template: false,
    },
    {
        name: "Chili Grocery List",
        favorite: false,
        template: false,
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
    },
    {
        name: "Lasagna Time !",
        favorite: false,
        template: true,
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
    },
];

const seedLists = async () => {
    try {
        if ((await List.count()) > 0) {
            console.log("Aborting: Lists are already seeded");
            return;
        }

        await seedUsers();
        await seedUnits();
        await seedIngredients();

        for (list of dummyLists) {
            if (list.rows) {
                list.rows = await fetchIdsForRows(list.rows);
            }
        }

        const lists = await addUser(dummyLists);

        const createdLists = await List.create(lists);

        console.log(`Created ${createdLists.length} lists`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Lists: ${error.message}`
        );
    }
};

module.exports = seedLists;
