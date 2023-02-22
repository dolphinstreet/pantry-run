const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const List = require("../../models/List.model");
const bcrypt = require("bcryptjs");
const {
    isLoggedOut,
    isLoggedIn,
    hasFavorite,
    loginFormValidation,
    signupFormValidation,
} = require("./../middlewares/auth");

router.get("/login", isLoggedOut, (req, res, next) => {
    // login page
    res.render("auth/login");
});

router.post(
    "/login",
    isLoggedOut,
    loginFormValidation,
    async (req, res, next) => {
        // login form submission
        try {
            const actualEmail = req.body.email;
            const actualPassword = req.body.password;

            //Check if we have this email in the database
            const userInDb = await User.findOne(
                { email: actualEmail } //find
            );

            if (!userInDb) {
                return res.render("auth/login", {
                    error: "You never registered with this email !",
                });
            }
            // Check if it's the right password
            const samePasswords = await bcrypt.compare(
                actualPassword,
                userInDb.password
            );

            if (!samePasswords) {
                return res.render("auth/login", {
                    error: "The username or/and the email are wrong !",
                });
            }
            //set the user to be the session user without the password for security reasons
            req.session.currentUser = {
                id: userInDb.id,
                email: userInDb.email,
                username: userInDb.username,
            };

            hasFavorite(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/signup", isLoggedOut, (req, res, next) => {
    // signup page
    res.render("auth/signup");
});

router.post(
    "/signup",
    isLoggedOut,
    signupFormValidation,
    async (req, res, next) => {
        // signup form submission
        try {
            const actualEmail = req.body.email;
            const actualUsername = req.body.username;
            const actualPassword = req.body.password;

            //Check if it's already registered
            const alreaydAnUser = await User.findOne({ email: actualEmail });
            if (alreaydAnUser) {
                return res.render("auth/signup", {
                    error: "This email is already in use",
                    username: actualUsername,
                });
            }

            //Let's hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(actualPassword, salt);
            const userToCreate = {
                username: actualUsername,
                password: hashedPassword,
                email: actualEmail,
            };
            //Add the user to the database
            const newUser = await User.create(userToCreate);
            req.session.currentUser = newUser;

            res.redirect("lists");
        } catch (error) {
            next(error);
        }
    }
);

router.get("/logout", isLoggedIn, (req, res, next) => {
    // logout user
    req.session.destroy((err) => {
        if (err) {
            next(err);
        }
        //redirect to homepage
        res.redirect("/");
    });
});

module.exports = router;
