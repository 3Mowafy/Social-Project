const groupModel = require("../models/group.model");
const { resBuilder } = require("../helper/help.helper");
const postModel = require("../models/post.model");

class Group {
    static addGroup = async (req, res) => {
        try {
            const groupData = new groupModel({
                userId: req.user._id,
                ...req.body,
            });
            await groupData.save();
            resBuilder(res, true, groupData, "Group Added");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static editGroup = async (req, res) => {
        try {
            const groupData = await groupModel.findOne({ _id: req.params.id });
            groupData.name = req.body.name;
            groupData.description = req.body.description;
            await groupData.save();
            resBuilder(res, true, groupData, "Group Edited");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static removeGroup = async (req, res) => {
        try {
            await groupModel.findByIdAndDelete(req.params.id);
            resBuilder(res, true, "", "Group Removed");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static addGroupCoverImg = async (req, res) => {
        try {
            const groupData = await groupModel.findOne({ _id: req.params.id });
            groupData.coverImg = req.file.path.replace("static\\", "");
            await groupData.save();
            resBuilder(res, true, groupData, "Add Group Cover Img");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static addPost = async (req, res) => {
        try {
            const groupData = await groupModel.findById(req.params.id);
            const postData = new postModel({
                groupId: groupData._id,
                userId: req.user._id,
                postImg: req.file.path.replace("static\\", ""),
                ...req.body,
            });
            await postData.save();
            resBuilder(res, true, postData, "Post Added");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static showGroupPosts = async (req, res) => {
        try {
            const postsData = await postModel.find({groupId: req.params.id});
            resBuilder(res, true, postsData, "All Group Posts");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };
}
module.exports = Group;
