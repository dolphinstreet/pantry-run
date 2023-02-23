const express = require("express");
const router = express.Router();
const List = require("../../models/List.model");
const { cleanList } = require("../middlewares/cleaners/list.cleaner");

router.get("/", (req, res, next) => {
    // Return user's current lists
});

router.post("/", cleanList, (req, res, next) => {
    try {
        req.body.user = req.session.currentUser.id;
        const newList = List.create(req.body);
        res.status(200).send(newList.id);
    } catch (error) {
        next(error);
    }
});

router.delete("/:listId", (req, res, next) => {
    // Delete list
});

router.patch("/empty/:listId", (req, res, next) => {
    // Empty list
});

router.patch("/save", cleanList, async (req, res, next) => {
    // Save list with edit form infos in body
    try {
        const listId = req.body._id;
        delete req.body._id;

        const updated = await List.findByIdAndUpdate(listId, req.body);
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
});

router.post("/save/:listId", (req, res, next) => {
    // Save list by duplicating a list based on list Id
});

router.patch("/:listId", (req, res, next) => {
    //
});

router.patch("/import/:destinationId", (req, res, next) => {
    // Import ingredients from source list in destination list
});

module.exports = router;
