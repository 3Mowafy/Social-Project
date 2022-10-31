const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    postImg: {
      type: String,
      trim: true,
      default: "",
    },
    likes: [
      {
        userId: mongoose.Schema.Types.ObjectId,
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        comment: {
          type: String,
          trim: true,
        },
        commentImg: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

const post = mongoose.model("Post", postSchema);

module.exports = post;
