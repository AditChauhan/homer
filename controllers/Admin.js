const { User } = require("../models/User");

//MakeBuilder
async function MakeBuilder(req, res) {
  try {
    //take the id of the user from the request and update the role to "Builder"
    const id = req.body.id;
    
    const user = await User.findById(id);
    if (user) {
      user.Role = "Builder";
      user.save();
      res.send(user);
    } else {
      res.status(400).send({ message: "User does not exist" });
    }
  } catch (error) {
    res.json(error);
  }
}
module.exports = { MakeBuilder };
