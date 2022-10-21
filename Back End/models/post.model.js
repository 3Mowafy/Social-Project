const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
        likes: [
            {
                like: {
                    type: mongoose.Schema.Types.ObjectId,
                },
            },
        ],
        comments: [
            {
                comment: {
                    type: String,
                    trim: true,
                },
            },
        ],
        share: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const post = mongoose.model("Post", postSchema);

module.exports = post;
