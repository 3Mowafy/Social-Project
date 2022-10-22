const storyModel = require("../models/story.model");
const { resBuilder } = require("../helper/help.helper");

class Story {
    static addStory = async (req, res) => {
        try {
            const storyData = new storyModel({
                userId: req.user._id,
                storyImg: req.file.path.replace("static\\", ""),
                ...req.body,
            });
            await storyData.save();
            resBuilder(res, true, storyData, "Story Added");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    // static removeStoryDynamic = async (req, res) => {
    //     try {
    //         const storyData = await storyModel.find();
    //         storyData.forEach(async (e) => {
    //             const date = new Date();
    //             const tomorrow = new Date(e.createdAt);
    //             tomorrow.setDate(tomorrow.getDate() + 1);

    //             if (date >= tomorrow) {
    //                 e.delete();
    //             }
    //         });
    //         resBuilder(res, true, storyData, "Story Removed");
    //     } catch (e) {
    //         resBuilder(res, false, e, e.message);
    //     }
    // };

    static removeStory = async (req, res) => {
        try {
            await storyModel.findByIdAndDelete(req.params.id);
            resBuilder(res, true, "", "Story Removed");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };
}

module.exports = Story;
