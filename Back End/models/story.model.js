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
  },
  { timestamps: true }
);

const story = mongoose.model("Story", storySchema);

module.exports = story;
