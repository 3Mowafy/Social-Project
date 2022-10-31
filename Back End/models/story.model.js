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
      default: "defaults/story.webp",
    },
    createdAt: {
      type: Date,
      expires: 86400,
      index: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const story = mongoose.model("Story", storySchema);

module.exports = story;
