const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
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
                type: String,
                trim: true,
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
});

const post = mongoose.model("Post", postSchema);

module.exports = post;
