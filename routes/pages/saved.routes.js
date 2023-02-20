const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // display all saved lists
});

router.get("/:listId", (req, res, next) => {
    // display saved list details
});

router.get("/:listId/edit", (req, res, next) => {
    // display saved list form
});

module.exports = router;
