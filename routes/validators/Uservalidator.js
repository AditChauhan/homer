const validator = require("validator");
const { User } = require("../../models/User");

async function register(req, res, next) {
  try {
    // email firstName lastName password are required
    const userData = req.body;
    // check if all fields are filled
    if (
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.password ||
      !userData.phoneNumber
    ) {
      return res.status(400).send({
        message: "Please fill all fields",
        fields: ["email", "firstName", "lastName", "password", "phoneNumber"],
      });
    }
    // check if email is valid
    if (!validator.isEmail(userData.email)) {
      return res.status(400).send({ message: "Invalid email" });
    }
    // check if password is valid
    if (!validator.isLength(userData.password, { min: 6 })) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters" });
    }
    //check if email is already in use
    const user = await User.findOne({ email: userData.email });
    if (user) {
      return res.status(400).send({ message: "Email already in use" });
    }

    next();
  } catch (error) {
    res.json(error);
  }
}
async function login(req, res, next) {
  try {
    // email and password are required
    const userData = req.body;
    // check if all fields are filled
    if (!userData.email || !userData.password) {
      return res.status(400).send({
        message: "Please fill all fields",
        fields: ["email", "password"],
      });
    }

    next();
  } catch (error) {
    res.json(error);
  }
}

module.exports = { register, login };
