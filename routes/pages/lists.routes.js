const express = require("express");
const router = express.Router();
const List = require('../../models/List.model')
const User = require('../../models/User.model');
const { isLoggedIn } = require("../middlewares/auth");

router.get("/", isLoggedIn, (req, res, next) => {
    // display all lists

    res.render("lists/list-of-lists")
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
