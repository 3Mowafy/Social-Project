const mongoose = require("mongoose");

const msgSchema = mongoose.Schema(
    {
        chat: { type: mongoose.Schema.Types.ObjectId },
        content: String,
        sender: String,
    },
    { timestamps: true }
);

const Msg = mongoose.model("Msg", msgSchema);

module.exports = Msg;
