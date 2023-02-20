const express = require("express");
const router = express.Router();


router.post("/", (req, res, next) => {
    // Add new tag
})

router.patch("/:tagId", (req, res, next) => {
    // Edit tag name and color
})

router.delete("/:tagId", (req, res, next) => {
    // Delete tag
})


module.exports = router;
