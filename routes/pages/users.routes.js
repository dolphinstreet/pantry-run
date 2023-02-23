const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Tag = require("../../models/Tag.model");
const bcrypt = require("bcryptjs");
const { isLoggedIn } = require("../middlewares/auth");

router.get("/", isLoggedIn, async (req, res, next) => {
    // profile consultation page
    try {
        const user = req.session.currentUser
        res.locals.navbar.icon = "fa-regular fa-pen-to-square";
        res.locals.navbar.link = `/profile/edit`;

        res.render("user/profile", { user });
    } catch (error) {
        next(error);
    }
});

router.get("/edit", isLoggedIn, (req, res, next) => {
    // profile edition page
    try {
        res.locals.navbar.icon = "fa-solid fa-check";
        res.locals.navbar.type = `submit`;

        const user = req.session.currentUser
        res.render("user/edit", { user });
    } catch (error) {
        next(error);
    }
});

router.post("/edit", isLoggedIn, async (req, res, next) => {
    // profile edition form submission
    res.locals.navbar.icon = "fa-solid fa-check";
    try {
        const { username, oldPassword, newPassword, repeatPassword } = req.body
        const user = req.session.currentUser

        const update = {}

        if (username) {
            update.username = username
        }

        if (newPassword && oldPassword && repeatPassword) {
            const foundUser = await User.findById(user.id)

            const samePasswords = await bcrypt.compare(
                oldPassword,
                foundUser.password
            );

            if (samePasswords) {
                const salt = await bcrypt.genSalt(10);
                const hashedNewPassword = await bcrypt.hash(newPassword, salt);
                update.password = hashedNewPassword;
            } else {
                return res.render("user/edit", { user, error: "Are you sure about this password ?" })
            }

        } else if (newPassword || oldPassword || repeatPassword) {
            return res.render("user/edit", { user, error: "Fill every field, please !" })
        }
        if (newPassword !== repeatPassword) {
            return res.render("user/edit", { user, errorMatch: "Passwords don't match !" })
        }
        const updatedUser = await User.findByIdAndUpdate(
            user.id, update, { new: true }
        );

        req.session.currentUser = {
            id: updatedUser.id,
            email: updatedUser.email,
            username: updatedUser.username,
            photo: updatedUser.photo
        }
        res.locals.currentUser = req.session.currentUser
        res.redirect("/profile")

    } catch (error) {
        next(error)
    }

});

router.delete("/:userId", isLoggedIn, (req, res, next) => {
    // user deletion link
    // redirect to homepage (logged out obviously duh)
});

module.exports = router;
