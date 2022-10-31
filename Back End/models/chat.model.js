const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        users: [
            {
                chaterOne: { type: mongoose.Schema.Types.ObjectId },
                chaterTwo: { type: mongoose.Schema.Types.ObjectId },
            },
        ],
    },
    { timestamps: true }
);

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
