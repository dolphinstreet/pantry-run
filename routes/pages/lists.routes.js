const express = require("express");
const router = express.Router();
const List = require("../../models/List.model");
const User = require("../../models/User.model");
const Ingredient = require("../../models/Ingredient.model");
const Category = require("../../models/Category.model");
const Unit = require("../../models/Unit.model");
const { isLoggedIn } = require("../middlewares/auth");

//We are on based on /lists

router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        // display all lists

        const user = req.session.currentUser.id;
        const userLists = await List.find({
            $and: [{ template: { $ne: true } }, { user: user }],
        });
        res.render("lists/list-of-lists", { userLists });
    } catch (error) {
        next(error);
    }
});

router.get("/:listId", isLoggedIn, async (req, res, next) => {
    // display list details
    try {
        res.locals.navbar.icon = "fa-regular fa-pen-to-square";
        res.locals.navbar.link = `/lists/edit/${req.params.listId}`;
        res.locals.scripts = ["/js/list-details.js"];

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
        // aggregate for category listing
        // const data = await List.findById(req.params.listId).aggregate([
        //     { $unwind: "$rows" },
        //     {
        //         $lookup: {
        //             from: "ingredients",
        //             localField: "rows.ingredient",
        //             foreignField: "_id",
        //             as: "ingredient",
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "ingredient.category",
        //             foreignField: "_id",
        //             as: "category",
        //         },
        //     },
        //     {
        //         //wrong, need accumulator
        //         $group: {
        //             _id: category._id,
        //             name: "$category".name,
        //             ingredients: {
        //                 $push: "$rows",
        //             },
        //         },
        //     },
        // ]);
        // .populate({
        //     path: "rows.unit",
        //     model: Unit,
        // });

        res.render("lists/list-details", { list });
    } catch (error) {
        next(error);
    }
});

router.get("/edit/:listId", isLoggedIn, async (req, res, next) => {
    try {
        res.locals.navbar.icon = "fa-solid fa-check";
        res.locals.navbar.link = `/lists/${req.params.listId}`;
        res.locals.scripts = ["/js/list-edit.js"];

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

router.patch("/edit/:listId", isLoggedIn, (req, res, next) => {
    // list edition form submission
    res.send(req.body);
});

router.post("/", isLoggedIn, (req, res, next) => {
    try {
        //create new list
    } catch (error) {
        next(error);
    }
});

module.exports = router;
