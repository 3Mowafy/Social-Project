const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        coverImg: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const group = mongoose.model("Group", groupSchema);

module.exports = group;
