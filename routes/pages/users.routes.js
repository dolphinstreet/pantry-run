const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");

router.get("/:userId", async (req, res, next) => {
    // profile consultation page
    try {
        const user = req.session.currentUser.id;
        const userLists = await User.find({});
        res.render("saved/list-of-lists", { userLists });
    } catch (error) {
        next(error);
    }
});

router.get("/edit/:userId", (req, res, next) => {
    // profile edition page
});

router.post("/edit/:userId", (req, res, next) => {
    // profile edition form submission
});

router.delete("/:userId", (req, res, next) => {
    // user deletion link
    // redirect to homepage (logged out obviously duh)
});

module.exports = router;
