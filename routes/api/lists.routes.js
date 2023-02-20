const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    // Return user's current lists
})

router.delete("/:listId", (req, res, next) => {
    // Delete list
})

router.patch("/empty/:listId", (req, res, next) => {
    // Empty list
})

router.patch("/save", (req, res, next) => {
    // Save list with edit form infos in body 
})

router.post("/save/:listId", (req, res, next) => {
    // Save list by duplicating a list based on list Id
})

router.patch("/:listId", (req, res, next) => {
    // Edit list on field focus out
})

router.patch("/import/:destinationId", (req, res, next) => {
    // Import ingredients from source list in destination list
})




module.exports = router;
