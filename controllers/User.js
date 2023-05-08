const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { deleteFile } = require("../utils/utils");

//rgister user in the database and return the user
async function register(req, res) {
  const userData = req.body;

  if (req.file) {
    console.log(req.file);
    userData.Images_link = req.file.location;
    userData.Image_key = req.file.key;
  }

  userData.phone = userData.phoneNumber;

  try {
    const user = await User.register(userData);

    res.send(user);
  } catch (error) {
    res.json(error);
  }
}
// login user and return the user use async/await
async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.login(email, password);
    console.log(user);
    if (user) {
      const token = await user.generateAuthToken();
      console.log(token);
      res.send({ user, token });
    } else {
      res.status(400).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.json(error);
  }
}

// getUser
async function getUser(req, res) {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.json(error);
  }
}

// updateUser
async function updateUser(req, res) {
  const id = req.userId;
  const userData = req.body;
  try {
    if (req.file) {
      //delete the old image
      const oldImage = await User.findById(id);
      const key = oldImage.Image_key;
      deleteFile(key);
      //update the new image
      userData.Images_link = req.file.location;
      userData.Image_key = req.file.key;
    }

    //if userdata has password, hash it
    if (userData.password) {
      const hash = await bcrypt.hashSync(userData.password, 10);
      userData.password = hash;
    }
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.json(error);
  }
}

//deleteUser
async function deleteUser(req, res) {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (user) {
      const key = user.Image_key;
      deleteFile(key);
      await user.remove();
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
};
