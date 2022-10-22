const msgModel = require("../models/chat.model");
const userModel = require("../models/user.model");
const { resBuilder } = require("../helper/help.helper");

class Msg {
    static messages = async (req, res) => {
        try {
            const msgData = await msgModel.find({ chat: req.params.id });
            const sender = await userModel.find({ sender: req.user._id });
            resBuilder(res, true, { msgData, sender }, "Messages");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };


}

module.exports = Msg;
