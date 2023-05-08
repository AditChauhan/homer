const validator = require("validator");
const { User } = require("../../models/User");

// MakeBuilder
async function MakeBuilder(req, res, next) {
    try {
        //check if req.Role is "Admin"
        if (req.Role !== "Admin") {
            return res.status(403).send({ auth: false, message: "Not an Admin" });
        }


        //id of the user is required
        const userData = req.body;
        //check if all fields are filled
        if (!userData.id) {
            return res.status(400).send({
                message: "Please fill all fields",
                fields: ["id"],
            });
        }
        //check if user exists
        const user = await User.findById(userData.id);
        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }

        //check if user is already a builder
        if (user.Role === "Builder") {
            return res.status(400).send({ message: "User is already a builder" });
        }
        

        next();
    } catch (error) {
        res.json(error);
    }
}

    

module.exports = { MakeBuilder };
