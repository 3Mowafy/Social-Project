const { resBuilder } = require("../helper/help.helper");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
class Auth {
    static auth = async (req, res, next) => {
        try {
            const token = req.header("Authorization").replace("bearer ", "");
            const decode = jwt.verify(token, process.env.JWTKEY);
            const userData = await userModel.findOne({
                _id: decode._id,
                "tokens.token": token,
            });
            if (!userData) throw new Error("Unauthorized");
            req.user = userData;
            req.token = token;
            next();
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };
}

module.exports = Auth;
