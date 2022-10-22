const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        users: [{ type: mongoose.Schema.Types.ObjectId }],
    },
    { timestamps: true }
);

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
