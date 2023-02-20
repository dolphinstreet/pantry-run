const express = require("express");
const router = express.Router();

router.get("/:query", (req, res, next) => {
    // Return list of ingredients filtered by name 
    // progressive search engine
})

router.post("/", (req, res, next) => {
    // Create new ingredient
})

router.patch("/:ingredientId", (req, res, next) => {
    // Edit ingredient
})


module.exports = router;
