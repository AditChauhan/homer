const Property = require("../models/Property");
const { deleteFile } = require("../utils/utils");
const { User } = require("../models/User");

// @route   POST api/properties
// @desc    Create a property
// @access  Public
exports.createProperty = async (req, res) => {
  const propertyData = req.body;
  if (req.files) {
    let images = [];
    let videos = [];

    if (req.files.Images) {
      for (let i = 0; i < req.files.Images.length; i++) {
        images.push({
          link: req.files.Images[i].location,
          key: req.files.Images[i].key,
        });
      }
    }
    if (req.files.videos) {
      for (let i = 0; i < req.files.videos.length; i++) {
        videos.push({
          link: req.files.videos[i].location,
          key: req.files.videos[i].key,
        });
      }
    }

    propertyData.property_images = images;
    propertyData.property_videos = videos;
  }

  propertyData.property_builders = [req.userId];
  try {
    const property = await Property.create(propertyData);
    console.log(property);

    //add property to user
    const user = await User.findById(req.userId);
    user.Property_id.push(property._id);
    await user.save();

    console.log(user);

    res.send(property);   
  } catch (error) {
    res.json(error);
  }
};

// @route   GET api/properties
// @desc    Get all properties
// @access  Public
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (error) {
    res.json(error);
  }
};

// @route   GET api/properties/:id
// @desc    Get a property by id
// @access  Public
exports.getPropertyById = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findById(id);
    if (property) {
      res.send(property);
    } else {
      res.status(404).send({ message: "Property not found" });
    }
  } catch (error) {
    res.json(error);
  }
};

// @route   PUT api/properties/:id
// @desc    Update a property by id
// @access  Public
exports.updateProperty = async (req, res) => {
  const id = req.params.id;
  const propertyData = req.body;
  if (req.files) {
    let images = [];
    let videos = [];

    if (req.files.Images) {
      for (let i = 0; i < req.files.Images.length; i++) {
        images.push({
          link: req.files.Images[i].location,
          key: req.files.Images[i].key,
        });
      }
    }
    if (req.files.videos) {
      for (let i = 0; i < req.files.videos.length; i++) {
        videos.push({
          link: req.files.videos[i].location,
          key: req.files.videos[i].key,
        });
      }
    }

    propertyData.property_images = images;
    propertyData.property_videos = videos;
  }
  try {
    const property = await Property.findByIdAndUpdate(id, propertyData, {
      new: true,
    });
    if (property) {
      res.send(property);
    } else {
      res.status(404).send({ message: "Property not found" });
    }
  } catch (error) {
    res.json(error);
  }
};

// @route   DELETE api/properties/:id
// @desc    Delete a property by id
// @access  Public
exports.deleteProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findById(id);
    if (property) {
      //delete images
      for (let i = 0; i < property.property_images.length; i++) {
        deleteFile(property.property_images[i].key);
      }
      //delete videos
      for (let i = 0; i < property.property_videos.length; i++) {
        deleteFile(property.property_videos[i].key);
      }

      await property.remove();
      res.send(property);
    } else {
      res.status(404).send({ message: "Property not found" });
    }
  } catch (error) {
    res.json(error);
  }
};
