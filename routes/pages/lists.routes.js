const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // display all lists
});

router.get("/:listId", (req, res, next) => {
    // display list details
});

router.get("/:listId/edit", (req, res, next) => {
    // display list edition form
});

router.post("/:listId/edit", (req, res, next) => {
    // list edition form submission
});

module.exports = router;
