const cleanListForUpdate = (req, res, next) => {
    if (req.body._id) {
        // clean id
    }
    if (req.body.name) {
        // clean name
    }

    if (req.body.rows) {
        req.body.rows.forEach((row) => {
            console.log("cleaner row", row);
        });
    }

    if (req.body.favorite !== undefined) {
        // alter favorite
    }

    if (req.body.template !== undefined) {
        delete req.body.template;
    }

    if (req.body.user) {
        delete req.body.user;
    }
    next();
};

module.exports = {
    cleanListForUpdate,
};
