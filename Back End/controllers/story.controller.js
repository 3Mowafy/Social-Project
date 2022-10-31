const storyModel = require("../models/story.model");
const { resBuilder } = require("../helper/help.helper");

class Story {
  static addStory = async (req, res) => {
    try {
      const storyData = new storyModel({
        userId: req.user._id,
        ...req.body,
      });

      if (req.file) {
        storyData.storyImg = req.file.path.replace("static\\", "");
      }
      await storyData.save();
      resBuilder(res, true, storyData, "Story Added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static removeStory = async (req, res) => {
    try {
      await storyModel.findByIdAndDelete(req.params.id);
      resBuilder(res, true, "", "Story Removed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static showStory = async (req, res) => {
    try {
      const stories = await storyModel.find();
      resBuilder(res, true, stories, "All Stories");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = Story;
