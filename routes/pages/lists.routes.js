const express = require("express");
const router = express.Router();
const List = require('../../models/List.model')
const User = require('../../models/User.model');
const { isLoggedIn } = require("../middlewares/auth");

//We are on based on /lists

router.get("/", isLoggedIn, async (req, res, next) => {

    const anotherList = {
        name: "Pasta al sugo",
        favorite: true,
        user: req.session.currentUser
    }
    const aList = {
        name: "Lasagna",
        user: req.session.currentUser
    }
    const anotherNewList = await List.create(anotherList)
    const aNewList = await List.create(aList)

    // display all lists
    const user = req.session.currentUser._id
    const userLists = await List.find(
        { user: user }, //find
    )

    //res.send(userLists)
    res.render("lists/list-of-lists", { userLists })
});



router.get("/:listId", isLoggedIn, (req, res, next) => {
    // display list details
    res.render("lists/list-details")
});

router.get("/edit/:listId", isLoggedIn, (req, res, next) => {
    // display list edition form
});

router.post("/edit/:listId", isLoggedIn, (req, res, next) => {
    // list edition form submission
});

module.exports = router;
