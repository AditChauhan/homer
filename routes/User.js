const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//upload image function from utils.js
const { upload } = require("../utils/utils");

const {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/User");
const validator = require("./validators/Uservalidator");

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.post("/register", upload.single("Image"), validator.register, register);

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post("/login", validator.login, login);

// @route   GET api/users/:id
// @desc    Get a user by id
// @access  Public
router.get("/get", auth.verifyToken, getUser);

// @route   PUT api/users/:id
// @desc    Update a user by id
// @access  Public
router.patch("/update", auth.verifyToken, upload.single("Image"), updateUser);

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Public
router.delete("/delete", auth.verifyToken, deleteUser);

module.exports = router;
