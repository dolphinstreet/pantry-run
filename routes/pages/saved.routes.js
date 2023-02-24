const express = require("express");
const router = express.Router();
const List = require("../../models/List.model");
const Ingredient = require("../../models/Ingredient.model");
const Category = require("../../models/Category.model");
const Unit = require("../../models/Unit.model");
const { getUserLists } = require("../middlewares/list");

// Route prefix: /saved

router.get("/", getUserLists, async (req, res, next) => {
    // display all saved lists
    try {
        res.locals.navbar.link = "/saved/create";
        res.locals.scripts = ["/js/list-delete.js"];

        const user = req.session.currentUser.id;
        const savedLists = await List.find({
            $and: [{ template: { $eq: true } }, { user }],
        });
        res.render("saved/list-of-lists", { savedLists });
    } catch (error) {
        next(error);
    }
});

router.get("/create", (req, res, next) => {
    try {
        res.locals.navbar.link = `/saved`;
        res.locals.navbar.icon = "fa-solid fa-check";
        res.locals.module = ["/js/list-create.js"];
        res.locals.scripts = ["/js/list-delete.js"];
        res.locals.list = {
            name: "New List",
            template: true,
        };

        res.render("lists/list-edit");
    } catch (error) {
        next(error);
    }
});

router.get("/:listId", getUserLists, async (req, res, next) => {
    // display saved list details
    try {
        res.locals.navbar.icon = "fa-regular fa-pen-to-square";
        res.locals.navbar.link = `/saved/edit/${req.params.listId}`;
        res.locals.scripts = ["/js/list-delete.js"];

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
        res.locals.navbar.link = `/saved/${req.params.listId}`;
        res.locals.module = [
            "/js/swipe.js",
            "/js/list-edit.js",
            "/js/list-delete.js",
        ];

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

        res.render("lists/list-edit", { list });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
