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
            maxlength: 30,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            minlength: 3,
            maxlength: 30,
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
        messages: [
            {
                message: {
                    type: String,
                    trim: true,
                },
                time: {
                    type: Date,
                    default: new Date().toDateString(),
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
                friend: {
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
    return userData;
};

userSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bc.hash(this.password, 12);
});

userSchema.statics.login = async (email, password) => {
    const userData = await User.findOne({ email });
    if (!userData) throw new Error("invalid Email");
    const isValid = await bc.compare(password, userData.password);
    if (!isValid) throw new Error("invalid Password");
    if (userData.tokens.length > 9) throw new Error("too many logins");
    return userData;
};

userSchema.methods.genToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTKEY);
    this.tokens.push({ token });
    await this.save();
    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
