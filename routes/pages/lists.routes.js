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
        const userLists = await List.find({
            $and: [
                { template: { $ne: true } },
                { user: user }
            ]
        }
        )
        res.render("lists/list-of-lists", { userLists })
    } catch (error) {
        next(error)
    }
});


router.get("/:listId", isLoggedIn, async (req, res, next) => {
    // display list details
    try {
        res.locals.icon = "fa-regular fa-pen-to-square";
        const id = req.params.listId
        res.locals.link = `/edit/${id}`;
        const list = await List.findById(id)

        res.render("lists/list-details", { list })
    } catch (error) {
        next(error)
    }
});

router.get("/edit/:listId", isLoggedIn, async (req, res, next) => {
    // display list edition form
    try {
        //makeContentEditable()
        res.send("ciao")
        res.locals.icon = "fa-solid fa-check";
        const id = req.params.listId
        const list = await List.findById(id)

        res.render("lists/list-details", { list })
    } catch (error) {
        next(error)
    }
});

router.post("/edit/:listId", isLoggedIn, (req, res, next) => {
    // list edition form submission
});

module.exports = router;


// const anotherList = {
//     name: "Delfina's testing list",
//     favorite: false,
//     template: false,
//     rows: [
//         {
//             amount: 500, unit: "g", ingredient: {
//                 name: "Boeuf",
//                 category: "Meat"
//             },
//         },
//         {
//             amount: 2, unit: "", ingredient: {
//                 name: "Courgette",
//                 category: "Fresh produce"
//             },
//         },
//         {
//             amount: 10, unit: "", ingredient: {
//                 name: "Beer",
//                 category: "Alcohol"
//             }
//         },
//         {
//             amount: 150, unit: "g", ingredient: {
//                 name: "Steak",
//                 category: "Meat"
//             }
//         }
//     ],
//     user: req.session.currentUser.id
// }