const express = require("express");
const router = express.Router();
const User = require('../../models/User.model')
const bcrypt = require('bcryptjs')


// // logged user middleware
// const isLogged = (req, res, next) => {
//     // check if user logged in
//     // else send to login
// };

router.get("/login", (req, res, next) => {
    // login page
    res.render("auth/login", { title: "login" })
});

router.post("/login", async (req, res, next) => {
    // login form submission
    try {
        const actualEmail = req.body.email;
        const actualPassword = req.body.password;
        if (!actualEmail) {
            return res.render("auth/login", { errorEmail: "Don't forget the email !", password: actualPassword })
        }
        if (!actualPassword) {
            return res.render("auth/login", { errorPassword: "Don't forget the password !", email: actualEmail })
        }
        //Check if we have this email in the database
        const userInDb = await User.findOne(
            { email: actualEmail }, //find
            { email: 1, password: 1 } //projection
        )
        if (!userInDb) {
            return res.render("auth/login", { error: "You never registered with this email !" })
        }
        // Check if it's the right password
        const samePasswords = await bcrypt.compare(actualPassword, userInDb.password)

        if (!samePasswords) {
            return res.render("auth/login", { error: "The username or/and the email are wrong !" })
        }
        //set the user to be the session user
        req.session.currentUser = userInDb;
        console.log(userInDb)
        res.redirect("lists") //not really but
    } catch (error) {
        next(error)
    }

});

router.get("/signup", (req, res, next) => {
    // signup page
    res.render("auth/signup")
});

router.post("/signup", async (req, res, next) => {
    // signup form submission
    try {
        const actualEmail = req.body.email;
        const actualUsername = req.body.username;
        const actualPassword = req.body.password;
        //Checks for filled fields
        if (!actualEmail) {
            return res.render("auth/signup", { errorEmail: "Don't forget the email !", username: actualUsername, password: actualPassword })
        }
        if (!actualUsername) {
            return res.render("auth/signup", { errorUsername: "Don't forget the username !", password: actualPassword, email: actualEmail })
        }
        if (!actualPassword) {
            return res.render("auth/signup", { errorPassword: "Don't forget the password !", username: actualUsername, email: actualEmail })
        }
        //Checks for email validation
        if (!actualEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return res.render("auth/signup", { errorEmail: "This isn't an email !", username: actualUsername, password: actualPassword })
            console.log("ciao")
        }
        //Checks for password security
        if (actualPassword.length < 8) {
            return res.render("auth/signup", { errorPassword: "The password must be at least 8 characters long !", username: actualUsername, password: actualPassword, email: actualEmail })
        }
        if (!actualPassword.match(/(?=.*[A-Z])/g)) {
            return res.render("auth/signup", { errorPassword: "You must include at least one uppercase letter !", username: actualUsername, password: actualPassword, email: actualEmail })
        }
        if (!actualPassword.match(/(?=.*[a-z])/g)) {
            return res.render("auth/signup", { errorPassword: "You must include at least one lowercase letter !", username: actualUsername, password: actualPassword, email: actualEmail })
        }
        if (!actualPassword.match(/(?=.*[1-9])/g)) {
            return res.render("auth/signup", { errorPassword: "You must include at least one number !", username: actualUsername, password: actualPassword, email: actualEmail })
        }
        //Check if it's already registered
        const alreaydAnUser = await User.findOne({ email: actualEmail })
        if (alreaydAnUser) {
            return res.render("auth/signup", { errorEmail: "This email is already registered", password: actualUsername, username: actualUsername })
        }

        //Let's hash the password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(actualPassword, salt)
        const userToCreate = {
            username: actualUsername,
            password: hashedPassword,
            email: actualEmail
        }
        //Add the user to the database
        const newUser = await User.create(userToCreate)
        //set the user to be the session user
        req.session.currentUser = newUser;

        res.redirect("lists") // not really but
    } catch (error) {
        next(error)
    }
});
//router.get("/logout", (req, res, next) => {
router.post("/logout", (req, res, next) => { // this one should be a post, right ?
    // logout user
    req.session.destroy(err => {
        if (err) {
            next(err);
        }
        //redirect to homepage
        res.redirect('/welcome');
    });
});

module.exports = router;
