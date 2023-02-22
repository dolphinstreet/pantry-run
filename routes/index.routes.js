const express = require("express");
const { isLoggedIn, isLoggedOut } = require("./middlewares/auth.js");
const router = express.Router();

/* GET home page */
router.get("/", isLoggedOut, (req, res, next) => {
    res.render("welcome");
});

router.use((req, res, next) => {
    res.locals.navbar = {
        icon: "fa-regular fa-plus",
    };
    next();
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
