const express = require("express");
const router =  express.Router();

const userController = require("../controllers/userController.js");

const verify = require("../auth.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Exportable Router
module.exports = router;
