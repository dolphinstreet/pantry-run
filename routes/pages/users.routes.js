const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res, next) => {
    // profile consultation page
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
