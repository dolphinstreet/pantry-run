const express = require("express");
const router = express.Router();
const List = require("../../models/List.model");

router.get("/", async (req, res, next) => {
    // display all saved lists
    try {
        const user = req.session.currentUser.id;
        const savedLists = await List.find({
            $and: [{ template: { $eq: true } }, { user: user }],
        });
        res.render("saved/list-of-lists", { savedLists });
    } catch (error) {
        next(error);
    }
});

router.get("/:listId", async (req, res, next) => {
    // display saved list details
    try {
        res.locals.navbar.icon = "fa-regular fa-pen-to-square";
        res.locals.navbar.link = `/lists/edit/${req.params.listId}`;

        // #TODO aggregate with mongoose
        const list = await List.findById(req.params.listId)
            .populate({
                path: "rows.unit",
                model: Unit,
            })
            .populate({
                path: "rows.ingredient",
                model: Ingredient,
                populate: { path: "category", model: Category },
            });
        res.render("saved/list-details", { list });
    } catch (error) {
        next(error);
    }
});

router.get("/edit/:listId", async (req, res, next) => {
    // display saved list form
    try {
        res.locals.navbar.icon = "fa-solid fa-check";
        res.locals.navbar.link = `/lists/${req.params.listId}`;

        // #TODO aggregate with mongoose
        const list = await List.findById(req.params.listId)
            .populate({
                path: "rows.unit",
                model: Unit,
            })
            .populate({
                path: "rows.ingredient",
                model: Ingredient,
                populate: { path: "category", model: Category },
            });

        res.render("saved/list-edit", { list });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
