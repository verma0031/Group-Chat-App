const express = require("express");

const authorization = require('../middleware/auth')

const chatControllers = require("../controllers/chatControllers");

const router = express.Router();

router.post("/new", chatControllers.createNewChat);
router.get("/allchats",authorization.authenticate, chatControllers.getChats);

module.exports = router;
