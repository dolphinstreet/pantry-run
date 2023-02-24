const List = require("../../models/List.model");

const getUserLists = async (req, res, next) => {
    try {
        const userLists = await List.find(
            {
                template: false,
                user: req.session.currentUser.id,
            },
            {
                name: 1,
                favorite: 1,
            }
        );
        res.locals.userLists = userLists.sort(
            (a, b) => b.favorite - a.favorite
        );
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { getUserLists };
