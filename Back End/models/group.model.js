const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
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
