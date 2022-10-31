const chatModel = require("../models/chat.model");
const { resBuilder } = require("../helper/help.helper");

class Chat {
    static initChat = async (req, res) => {
        try {
            const chatData = new chatModel({
                users: [{ chaterOne: req.user._id, chaterTwo: req.params.id }],
            });
            await chatData.save();
            resBuilder(res, true, chatData, "Chat Started");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

}

module.exports = Chat;
