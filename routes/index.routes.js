const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

// page routing
router.use("/", require("./authentication.routes"));
router.use("/user", require("./user.routes"));
router.use("/lists", require("./lists.routes"));
router.use("/saved", require("./saved.routes"));
router.use("/recipes", require("./recipes.routes"));

// api routing
router.use("/api/lists", require("./api/lists.routes"));
router.use("/api/recipes", require("./api/recipes.routes"));
router.use("/api/tags", require("./api/tags.routes"));
router.use("/api/ingredients", require("./api/ingredients.routes"));

module.exports = router;
