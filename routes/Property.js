const express = require("express");
const router = express.Router();

//upload image function from utils.js
const { upload } = require("../utils/utils");

const validator = require("./validators/Propertyvalidator");
const PropertyController = require("../controllers/Property");
const auth = require("../middleware/auth");

// @route   POST api/properties
// @desc    Create a property
// @access  Public
router.post(
    "/create",
    auth.verifyBuilder,
    upload.fields([ { name: "Images" }, { name: "videos" } ]),
    validator.createProperty,
    PropertyController.createProperty
);


// @route   GET api/properties
// @desc    Get all properties
// @access  Public
router.get("/getall", PropertyController.getAllProperties);


// @route   GET api/properties/:id
// @desc    Get a property by id
// @access  Public
router.get("/get/:id", PropertyController.getPropertyById);


//get properties by location
// router.post("/location", PropertyController.getPropertiesByLocation);




// @route   PUT api/properties/:id
// @desc    Update a property by id
// @access  Public
router.patch(
    "/update/:id",
    auth.verifyBuilder,
    upload.fields([{ name: "Image" }, { name: "Video" }]),
    validator.updateProperty,
    PropertyController.updateProperty
);


// @route   DELETE api/properties/:id
// @desc    Delete a property
// @access  Public
router.delete("/delete/:id",auth.verifyBuilder, validator.deleteProperty, PropertyController.deleteProperty);





module.exports = router;
