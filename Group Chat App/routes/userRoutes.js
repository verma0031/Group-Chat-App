
const express = require("express");
const authorization = require('../middleware/auth');
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", userControllers.createNewUser);
router.post("/login", userControllers.login);
router.get('/getAllMembers',authorization.authenticate, userControllers.getAllMembers);
// router.post("/change-admin", userControllers.changeAdminStatus);

module.exports = router;
