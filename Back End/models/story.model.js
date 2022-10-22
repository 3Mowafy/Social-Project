const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        storyImg: {
            type: String,
            trim: true,
            default: "",
        },
        createdAt: {
            type: Date,
            expires: "1m",
            index: true,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const story = mongoose.model("Story", storySchema);

module.exports = story;
