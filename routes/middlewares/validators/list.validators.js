const validateName = (req, res, next) => {
    if (req.body.name && !req.body.name instanceof String) {
        // type error
    }
    next();
};

const validateFavorite = (req, res, next) => {
    if (req.body.favorite && !req.body.name instanceof Boolean) {
        // type error
    }
    next();
};

const validateRows = (req, res, next) => {
    if (req.body.rows && !Array.isArray(req.body.rows)) {
        // type error
    }

    next();
};

const validateUser = (req, res, next) => {
    if (req.body.user && req.body.user !== req.session.currentUser.id) {
        // wrong user // forbidden
    }

    next();
};
