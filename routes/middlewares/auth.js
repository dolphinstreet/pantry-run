const List = require("../../models/List.model");


// checks if the user is logged in when trying to access the page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/login');
    }
    next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the favorite list page or lists page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        hasFavorite(req, res, next)
    }
    next();
};

//Check if the user has a favorite liste or not and redirects
const hasFavorite = async (req, res, next) => {
    if (!req.session.favoriteList) {
        const favoriteList = await List.findOne({ favorite: true, user: req.session.currentUser.id })
        if (favoriteList) {
            req.session.favoriteList = favoriteList.id
        }
    }
    if (req.session.favoriteList) {
        res.redirect(`/lists/${req.session.favoriteList}`);
    } else {
        res.redirect("/lists");
    }
}
/**
 * Check if the field is filled in form
 * @param {String} field form input name in request
 * @param {String} value form input value in request
 * @param {Response} res response object
 */
function requiredField(field, value, res) {
    if (!value) {
        if (!res.locals.errors) {
            res.locals.errors = {}
        }
        res.locals.errors[field] = `Don't forget the ${field} !`;
        //console.log(res.errors[field])
    } else {
        res.locals[field] = value;
    }
}

//Validation for login
const loginFormValidation = (req, res, next) => {
    const actualEmail = req.body.email;
    const actualPassword = req.body.password;

    requiredField("email", actualEmail, res)
    requiredField("password", actualPassword, res)

    res.locals.email = actualEmail;
    res.locals.password = "";

    if (res.locals.errors !== undefined) {
        return res.render("auth/login")
    } else {
        next()
    }
}


//Validation for signup filled fields
const signupFormValidation = (req, res, next) => {
    const actualEmail = req.body.email;
    const actualPassword = req.body.password;
    const actualUsername = req.body.username;

    requiredField("email", actualEmail, res)
    requiredField("password", actualPassword, res)
    requiredField("username", actualUsername, res)

    //Checks for email validation
    if (!res.locals.errors.email && !actualEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        res.locals.errors["email"] = `This isn't an email !`;
    }
    //Checks for password security
    if (!res.locals.errors.password && actualPassword.length < 8) {
        res.locals.errors["password"] = `The password must be at least 8 characters long !`;
    }
    res.locals.email = actualEmail;
    res.locals.username = actualUsername;
    res.locals.password = "";

    if (res.locals.errors !== undefined) {
        return res.render("auth/signup")
    } else {
        next()
    }

}




module.exports = {
    isLoggedIn,
    isLoggedOut,
    hasFavorite,
    loginFormValidation,
    signupFormValidation
};