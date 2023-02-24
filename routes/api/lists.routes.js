const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const List = require("../../models/List.model");
const { cleanList } = require("../middlewares/cleaners/list.cleaner");

router.get("/", (req, res, next) => {
    // Return user's current lists
});

router.post("/", cleanList, async (req, res, next) => {
    try {
        req.body.user = req.session.currentUser.id;

        const favoriteList = await List.count({
            favorite: true,
            user: req.body.user,
        }).exec();

        if (!favoriteList) {
            req.body.favorite = true;
        }

        const newList = await List.create(req.body);
        res.status(200).send(newList.id);
    } catch (error) {
        next(error);
    }
});

router.delete("/:listId", async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.listId)) {
            return res.status(400).send("Invalid request");
        }
        const deletedList = await List.findByIdAndDelete(req.params.listId);
        if (!deletedList) {
            return res.status(400).send("Bad request");
        }
        if (deletedList.favorite) {
            const nextFavorite = await List.findOneAndUpdate(
                { template: false, user: req.session.currentUser.id },
                { favorite: true },
                { new: true }
            );
            if (nextFavorite) {
                return res.status(200).send({ favorite: nextFavorite.id });
            }
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.patch("/favorite/:listId", async (req, res, next) => {
    try {
        const previousFavorite = await List.findOneAndUpdate(
            { favorite: true, user: req.session.currentUser.id },
            { favorite: false },
            { new: true }
        );
        if (previousFavorite && previousFavorite.id === req.params.listId) {
            return res.status(400).send("Bad request");
        }
        await List.findByIdAndUpdate(req.params.listId, { favorite: true });
        if (previousFavorite) {
            res.status(200).send({ "_id": previousFavorite?.id });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
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
