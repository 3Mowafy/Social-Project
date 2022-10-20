const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        age: {
            type: String,
            trim: true,
            required: true,
        },
        gender: {
            type: String,
            trim: true,
            required: true,
        },
        profileImg: {
            type: String,
            trim: true,
        },
        coverImg: {
            type: String,
            trim: true,
        },
        messages: [
            {
                message: {
                    type: String,
                    trim: true,
                },
                time: {
                    type: String,
                    trim: true,
                },
            },
        ],
        stories: [
            {
                storyContent: {
                    type: String,
                    trim: true,
                },
                storyImg: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
