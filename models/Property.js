const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const PropertySchema = new Schema(
  {
    property_name: {
      type: String,
      required: true,
    },
    property_type: {
      type: String,
      required: true,
    },
    property_address: {
      type: String,
      required: true,
    },
    property_city: {
      type: String,
      required: true,
    },
    property_state: {
      type: String,
      required: true,
    },
    property_zip: {
      type: String,
      required: true,
    },
    property_country: {
      type: String,
      required: true,
    },
    property_description: {
      type: String,
      required: true,
    },
    property_price: {
      type: Number,
      required: true,
    },
    property_images: [
      {
        link: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          required: true,
        },
      },
    ],
    property_videos: [
      {
        link: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          required: true,
        },
      },
    ],
    property_status: {
      type: String,
      required: true,
      default: "pending",
    },
    property_Cordinates: {
      type: String,
      required: true,
      default: "No Cordinates",
    },
    property_builders: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongooes.model("Property", PropertySchema);
module.exports = Property;
