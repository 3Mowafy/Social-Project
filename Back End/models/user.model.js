const mongoose = require("mongoose");
const validator = require("validator");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: function (val) {
        if (!validator.isEmail(val)) throw new Error("invalid Email");
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      min: 15,
      max: 80,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      enum: ["male", "female"],
    },
    profileImg: {
      type: String,
      trim: true,
      default: "defaults/profileIcon.webp",
    },
    coverImg: {
      type: String,
      trim: true,
      default: "defaults/coverImage.png",
    },
    status: {
      type: Boolean,
      default: false,
    },
    notifications: [
      {
        notification: {
          type: String,
          trim: true,
        },
      },
    ],
    friends: [
      {
        name: { type: String, trim: true },
        friendImg: { type: String, trim: true },
        friendId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        chatId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    friendRequests: [
      {
        name: { type: String, trim: true },
        friendImg: { type: String, trim: true },
        friendId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    sendRequest: [
      {
        name: { type: String, trim: true },
        friendImg: { type: String, trim: true },
        friendId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.password;
  delete userData.__v;
  delete userData.tokens;
  return userData;
};

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bc.hash(this.password, 12);
});

userSchema.statics.login = async (email, password) => {
  const userData = await User.findOne({ email });
  if (!userData) throw new Error("invalid Data");
  const isValid = await bc.compare(password, userData.password);
  if (!isValid) throw new Error("invalid Data");
  return userData;
};

userSchema.methods.genToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTKEY);
  this.tokens.push({ token });
  await this.save();
  return token;
};

const postModel = require("../models/post.model");
userSchema.pre("remove", async function (next) {
  await postModel.deleteMany({ userId: this._id });
  const postData = await postModel.find();
  postData.forEach(async (e) => {
    e.comments = e.comments.filter((e) => !e.userId.equals(this._id));
    e.likes = e.likes.filter((e) => !e.like.userId.equals(this._id));
    await e.save();
  });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
