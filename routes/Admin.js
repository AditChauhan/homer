const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//make user to builder
const { MakeBuilder } = require("../controllers/Admin");
const validator = require("./validators/Adminvalidator");


// @route   POST api/users/make
// @desc    Make a user
// @access  Public
router.post("/MakeBuilder",auth.verifyAdmin, validator.MakeBuilder, MakeBuilder);



module.exports = router;
