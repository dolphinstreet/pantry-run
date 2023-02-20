const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // display all recipes
});

router.get("/:recipeId", (req, res, next) => {
    // display recipe details
});

router.get("/create/:recipeId", (req, res, next) => {
    // display recipe edit form
});

router.post("/create/:recipeId", (req, res, next) => {
    // recipe edit form submission
    // on successfull db insert, redirect to /:recipeId/edit for final touches
});

router.get("/edit/:recipeId", (req, res, next) => {
    // display recipe edit form
});

router.post("/edit/:recipeId", (req, res, next) => {
    // recipe edit form submission
    // on successful db update, redirect to /:recipeId
});

module.exports = router;
