const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model");

const { resBuilder } = require("../helper/help.helper");

class User {
  static addUser = async (req, res) => {
    try {
      const userData = new userModel(req.body);
      await userData.save();
      resBuilder(res, true, userData, "User Added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const userData = await userModel.login(req.body.email, req.body.password);
      const token = await userData.genToken();
      resBuilder(res, true, { userData, token }, "User Logged in");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static profile = async (req, res) => {
    try {
      const userData = await userModel.findById(req.user._id);
      resBuilder(
        res,
        true,
        userData,
        `Profile ${userData.firstName} ${userData.lastName}`
      );
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static sendRequest = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      if (req.params.id == req.user._id) throw new Error("Same Body");
      userData.friendRequests.forEach((el) => {
        req.user.sendRequest.forEach((e) => {
          if (
            el.friendId.equals(req.user._id) &&
            e.friendId.equals(req.params.id)
          )
            throw new Error("Already Sended");
        });
      });

      userData.friends.forEach((el) => {
        req.user.friends.forEach((e) => {
          if (
            el.friendId.equals(req.user._id) &&
            e.friendId.equals(req.params.id)
          )
            throw new Error("Already Friend");
        });
      });

      userData.friendRequests.push({
        name: `${req.user.firstName} ${req.user.lastName}`,
        friendImg: req.user.profileImg,
        friendId: req.user._id,
      });
      await userData.save();

      req.user.sendRequest.push({
        name: `${userData.firstName} ${userData.lastName}`,
        friendImg: userData.profileImg,
        friendId: userData._id,
      });
      await req.user.save();

      resBuilder(res, true, { userData, user: req.user }, "Sent Done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static rmRejCanRequest = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      if (req.params.id == req.user._id) throw new Error("Same One");
      userData.friendRequests = userData.friendRequests.filter(
        (frequest) => !frequest.friendId.equals(req.user._id)
      );
      await userData.save();
      req.user.sendRequest = req.user.sendRequest.filter(
        (frequest) => !frequest.friendId.equals(req.params.id)
      );
      await req.user.save();
      resBuilder(res, true, { userData, user: req.user }, "Send Add");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static acceptRequest = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      if (req.params.id == req.user._id) throw new Error("Same One");
      userData.friends.forEach((el) => {
        req.user.friends.forEach((e) => {
          if (
            el.friendId.equals(req.user._id) &&
            e.friendId.equals(req.params.id)
          )
            throw new Error("Already Friend");
        });
      });

      userData.friends.push({
        name: `${req.user.firstName} ${req.user.lastName}`,
        friendImg: req.user.profileImg,
        friendId: req.user._id,
      });
      await userData.save();

      req.user.friends.push({
        name: `${userData.firstName} ${userData.lastName}`,
        friendImg: userData.profileImg,
        friendId: userData._id,
      });
      await req.user.save();

      resBuilder(res, true, { userData, user: req.user }, "Send Add");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static removeFriend = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      if (req.params.id == req.user._id) throw new Error("Same One");
      userData.friends = userData.friends.filter(
        (frequest) => !frequest.friendId.equals(req.user._id)
      );
      await userData.save();
      req.user.friends = req.user.friends.filter(
        (frequest) => !frequest.friendId.equals(req.params.id)
      );
      await req.user.save();
      resBuilder(res, true, { userData, user: req.user }, "Remove Done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static editProfile = async (req, res) => {
    try {
      const itemEdit = [
        "firstName",
        "lastName",
        "email",
        "password",
        "age",
        "gender",
      ];
      const keys = Object.keys(req.body);
      const valid = keys.every((item) => itemEdit.includes(item));
      if (!valid) throw new Error("Invalid Edit Key");
      keys.forEach((key) => (req.user[key] = req.body[key]));
      await req.user.save();
      resBuilder(res, true, req.user, "Profile Edited");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static removeProfile = async (req, res) => {
    try {
      const userData = await userModel.findById(req.user._id);
      await userData.remove();
      resBuilder(res, true, "", "Profile Removed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static addProfileImage = async (req, res) => {
    try {
      req.user.profileImg = req.file.path.replace("static\\", "");
      await req.user.save();
      resBuilder(res, true, req.user, "Image Updated");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static addProfileCoverIamge = async (req, res) => {
    try {
      req.user.coverImg = req.file.path.replace("static\\", "");
      await req.user.save();
      resBuilder(res, true, req.user, "Cover Image Updated");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token != req.token
      );
      await req.user.save();
      resBuilder(res, true, req.user, "User LogOut");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static status = async (req, res) => {
    try {
      if (req.header("status") == "activate") {
        if (req.user.status) throw new Error("Already Active");
        req.user.status = true;
        await req.user.save();
      } else if (req.header("status") == "deactivate") {
        if (!req.user.status) throw new Error("Not Acive");
        req.user.status = false;
        await req.user.save();
      }
      resBuilder(res, true, req.user, req.header("status"));
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static showUsers = async (req, res) => {
    try {
      const usesrsData = await userModel.find();

      resBuilder(res, true, usesrsData, "All Users");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static singleUser = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      resBuilder(res, true, userData, "Single USer");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = User;
