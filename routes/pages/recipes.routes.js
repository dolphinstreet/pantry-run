const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // display all recipes
});

router.get("/:recipeId", (req, res, next) => {
    // display recipe details
});

router.get("/:recipeId/create", (req, res, next) => {
    // display recipe edit form
});

router.post("/:recipeId/create", (req, res, next) => {
    // recipe edit form submission
    // on successfull db insert, redirect to /:recipeId/edit for final touches
});

router.get("/:recipeId/edit", (req, res, next) => {
    // display recipe edit form
});

router.post("/:recipeId/edit", (req, res, next) => {
    // recipe edit form submission
    // on successful db update, redirect to /:recipeId
});

module.exports = router;
