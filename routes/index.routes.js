const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

// page routing
router.use("/", require("./pages/authentication.routes"));
router.use("/profile", require("./pages/users.routes"));
router.use("/lists", require("./pages/lists.routes"));
router.use("/saved", require("./pages/saved.routes"));
router.use("/recipes", require("./pages/recipes.routes"));

// api routing
router.use("/api/lists", require("./api/lists.routes"));
router.use("/api/recipes", require("./api/recipes.routes"));
router.use("/api/tags", require("./api/tags.routes"));
router.use("/api/ingredients", require("./api/ingredients.routes"));

module.exports = router;
