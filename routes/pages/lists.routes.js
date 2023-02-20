const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // display all lists
});

router.get("/:listId", (req, res, next) => {
    // display list details
});

router.get("/edit/:listId", (req, res, next) => {
    // display list edition form
});

router.post("/edit/:listId", (req, res, next) => {
    // list edition form submission
});

module.exports = router;
