const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
    // Add new unit
    // check for uniqueness on {name, user} in db
});

router.patch("/:unitId", (req, res, next) => {
    // Edit unit name and user
    // check for uniqueness on {name, user} in db
});

// admin route
router.delete("/:unitId", (req, res, next) => {
    // Delete unit
});

module.exports = router;
