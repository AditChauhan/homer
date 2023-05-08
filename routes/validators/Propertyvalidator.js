const Property = require("../../models/Property");

async function createProperty(req, res, next) {
  try {
    if(req.Role !== "Builder") {
      return res.status(403).send({ auth: false, message: "Not an Builder" });
    }
    //property_name, property_type, property_address, property_city, property_state, property_zip, property_country, property_description, property_price, property_images, property_image_key, property_videos, property_video_key,  property_builders are the fields that are required to create a property
    const propertyData = req.body;
    //check if all fields are filled
    if (
      !propertyData.property_name ||
      !propertyData.property_type ||
      !propertyData.property_address ||
      !propertyData.property_city ||
      !propertyData.property_state ||
      !propertyData.property_zip ||
      !propertyData.property_country ||
      !propertyData.property_description ||
      !propertyData.property_price
    ) {
      return res.status(400).send({
        message: "Please fill all fields",
        fields: [
          "property_name",
          "property_type",
          "property_address",
          "property_city",
          "property_state",
          "property_zip",
          "property_country",
          "property_description",
          "property_price"
        ],
      });
    }

    next();
  } catch (error) {
    res.json(error);
  }
}

// updateProperty(req, res, next) {

async function updateProperty(req, res, next) {
  try {
    if(req.Role !== "Builder") {
      return res.status(403).send({ auth: false, message: "Not an Builder" });
    }
    //check if user has permission to update property
    const propertyData = req.body;
    const property = await Property.findById(req.params.id);
    if (property.property_builders.includes(req.user.id)) {
      next();
    } else {
      return res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res.json(error);
  }
}
// deleteProperty(req, res, next) {
async function deleteProperty(req, res, next) {
  try {
    if(req.Role !== "Builder") {
      return res.status(403).send({ auth: false, message: "Not an Builder" });
    }
    //check if user has permission to delete property
    const propertyData = req.body;
    const property = await Property.findById(req.params.id);
    if (property.property_builders.includes(req.user.id)) {
      next();
    } else {
      return res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res.json(error);
  }
}

module.exports = { createProperty, updateProperty, deleteProperty };
