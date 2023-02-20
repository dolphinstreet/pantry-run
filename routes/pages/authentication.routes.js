const express = require("express");
const router = express.Router();

// logged user middleware
const isLogged = (req, res, next) => {
    // check if user logged in
    // else send to login
};

router.get("/login", (req, res, next) => {
    // login page
});

router.post("/login", (req, res, next) => {
    // login form submission
});

router.get("/signup", (req, res, next) => {
    // signup page
});

router.post("/signup", (req, res, next) => {
    // signup form submission
});

router.get("/logout", (req, res, next) => {
    // logout user
    //redirect to homepage
});

module.exports = router;
