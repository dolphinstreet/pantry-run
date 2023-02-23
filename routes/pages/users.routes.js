const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Tag = require("../../models/Tag.model");

router.get("/", async (req, res, next) => {
    // profile consultation page
    try {
        //res.send(req.session.currentUser);
        res.render("user/profile");
    } catch (error) {
        next(error);
    }
});

router.get("/edit/", (req, res, next) => {
    // profile edition page
    try {
        res.send(req.session.currentUser);
    } catch (error) {
        next(error);
    }
});

router.post("/edit/", (req, res, next) => {
    // profile edition form submission
});

router.delete("/:userId", (req, res, next) => {
    // user deletion link
    // redirect to homepage (logged out obviously duh)
});

module.exports = router;
