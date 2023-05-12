const express = require("express");
const authorization = require('../middleware/auth')
const groupControllers = require("../controllers/groupControllers");

const router = express.Router();

router.post("/creategroup",authorization.authenticate, groupControllers.createNewGroup);
router.post("/addMember",authorization.authenticate, groupControllers.addNewMember);
router.get("/all",authorization.authenticate, groupControllers.getAllGroups);
module.exports = router;