const User = require("../../models/User.model");
const Unit = require("../../models/Unit.model");
const Ingredient = require("../../models/Ingredient.model");

async function addUser(array) {
    try {
        const defaultUser = await User.findOne().exec();

        return array.map((item) => {
            item.user = defaultUser.id;
            return item;
        });
    } catch (error) {
        console.log(
            "something went wrong when adding user to list",
            erorr.message
        );
    }
}

async function nameIndexedIds(model, nameList) {
    const documents = await model.find({ name: { $in: nameList } });

    return documents.reduce((aggregator, item) => {
        aggregator[item.name] = item.id;

        return aggregator;
    }, {});
}

function getFieldsLists(list) {
    return list.reduce(
        (aggregator, item) => {
            if (item.unit && !aggregator.units.includes(item.unit)) {
                aggregator.units.push(item.unit);
            }
            if (
                item.ingredient &&
                !aggregator.ingredients.includes(item.ingredient)
            ) {
                aggregator.ingredients.push(item.ingredient);
            }
            return aggregator;
        },
        { units: [], ingredients: [] }
    );
}

async function createInexistantEntries(needed, existing, model) {
    const needCreation = needed
        .filter((item) => !existing[item])
        .map((item) => {
            return { name: item };
        });

    if (needCreation.length > 0) {
        const created = await model.create(needCreation);

        created.forEach((item) => (existing[item.name] = item.id));
    }

    return existing;
}

async function fetchIdsForRows(rows) {
    try {
        const fields = getFieldsLists(rows);
        // console.log("aggregator:", fields);

        const units = await nameIndexedIds(Unit, fields.units);
        const ingredients = await nameIndexedIds(
            Ingredient,
            fields.ingredients
        );

        await createInexistantEntries(fields.units, units, Unit);
        await createInexistantEntries(
            fields.ingredients,
            ingredients,
            Ingredient
        );

        return rows.map((item) => {
            if (units[item.unit]) {
                item.unit = units[item.unit];
            } else {
                delete item.unit;
            }
            item.ingredient = ingredients[item.ingredient];
            return item;
        });
    } catch (error) {
        console.error(
            `An error occurred while populating rows with ids: ${error.message}`
        );
    }
}

module.exports = {
    addUser,
    fetchIdsForRows,
};
