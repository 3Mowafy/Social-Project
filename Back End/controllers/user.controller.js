const userModel = require("../models/user.model");
class User {
    static index = (req, res) => {
        res.send("Hello");
    };
}
module.exports = User;
