const express = require("express");
const router = express.Router();
const List = require('../../models/List.model')
const User = require('../../models/User.model');
const { isLoggedIn } = require("../middlewares/auth");

//We are on based on /lists

//Only for testing purposes
// async function someLists(req, res, next) {

//     const anotherList = {
//         name: "Weekly",
//         favorite: true,
//         user: req.session.currentUser.id
//     }
//     const aList = {
//         name: "Sunday's market",
//         user: req.session.currentUser.id
//     }
//     const anotherNewList = await List.create(anotherList)
//     const aNewList = await List.create(aList)
// }
//res.send(aNewList)
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        // // display all lists
        const user = req.session.currentUser.id
        const userLists = await List.find(
            { user } //find
        )
        res.render("lists/list-of-lists", { userLists })
    } catch (error) {
        next(error)
    }
});



router.get("/:listId", isLoggedIn, async (req, res, next) => {
    // display list details
    try {
        const id = req.params.listId
        const list = await List.findById(id)

        res.render("lists/list-details", { list })
    } catch (error) {
        next(error)
    }
});

router.get("/edit/:listId", isLoggedIn, (req, res, next) => {
    // display list edition form
});

router.post("/edit/:listId", isLoggedIn, (req, res, next) => {
    // list edition form submission
});

module.exports = router;
