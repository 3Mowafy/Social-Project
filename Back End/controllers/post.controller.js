const postModel = require("../models/post.model");
const { resBuilder } = require("../helper/help.helper");
const mongoose = require("mongoose");

class Post {
    static addPost = async (req, res) => {
        try {
            const postData = new postModel({
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

    static editPost = async (req, res) => {
        try {
            const postData = await postModel.findOne({ _id: req.params.id });
            postData.content = req.body.content;
            postData.postImg = req.file.path.replace("static\\", "");
            await postData.save();
            resBuilder(res, true, postData, "Post Edited");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static removePost = async (req, res) => {
        try {
            await postModel.findByIdAndDelete(req.params.id);
            resBuilder(res, true, "", "Post Removed");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static addRemoveLike = async (req, res) => {
        try {
            const postData = await postModel.findOne({ _id: req.params.id });
            const check = postData.likes.findIndex((val) =>
                val.like.userId.equals(req.user._id)
            );
            if (check == -1) {
                postData.likes.push({ like: { userId: req.user._id } });
                await postData.save();
            } else if (postData.likes[check].like.userId.equals(req.user._id)) {
                postData.likes = postData.likes.filter(
                    (like) => !like.like.userId.equals(req.user._id)
                );
                await postData.save();
            }
            resBuilder(res, true, postData, "Like Added Or Removed");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static addComment = async (req, res) => {
        try {
            const postData = await postModel.findById(req.params.id);
            postData.comments.push({
                userId: req.user._id,
                comment: req.body.comment,
                commentImg: req.file.path.replace("static\\", ""),
            });
            await postData.save();
            resBuilder(res, true, postData, "Comment Added");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static editComment = async (req, res) => {
        try {
            const postData = await postModel.findById(req.params.id);
            const check = postData.comments.find((comment) =>
                comment.userId.equals(req.user._id)
            );
            if (!check) throw new Error("Not Recomended to Edited");
            const edit = postData.comments.find((comment) =>
                comment._id.equals(req.params.commentId)
            );
            edit.comment = req.body.comment;
            edit.commentImg = req.file.path.replace("static\\", "");
            await postData.save();
            resBuilder(res, true, postData, "Comment Removed");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    // static editCommentImg = async (req, res) => {
    //     try {
    //         const postData = await postModel.findById(req.params.id);
    //         const check = postData.comments.find((comment) =>
    //             comment.userId.equals(req.user._id)
    //         );
    //         if (!check) throw new Error("Not Recomended to Edited");
    //         const edit = postData.comments.find((comment) =>
    //             comment._id.equals(req.params.commentId)
    //         );
    //         edit.commentImg = req.file.path.replace("static\\", "");
    //         await postData.save();
    //         resBuilder(res, true, postData, "Comment Removed");
    //     } catch (e) {
    //         resBuilder(res, false, e, e.message);
    //     }
    // };

    static removeComment = async (req, res) => {
        try {
            const postData = await postModel.findById(req.params.id);
            const check = postData.comments.find((comment) =>
                comment.userId.equals(req.user._id)
            );
            if (!check) throw new Error("Not Recomended to Delete");
            postData.comments = postData.comments.filter(
                (comment) => comment._id != req.params.commentId
            );
            await postData.save();
            resBuilder(res, true, postData, "Comment Removed");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static sharePost = async (req, res) => {
        try {
            let postData = await postModel
                .findById(req.params.id)
                .exec((err, doc) => {
                    doc._id = mongoose.Types.ObjectId();
                    doc.isNew = true;
                    doc.save();
                });
            resBuilder(res, true, "", "Post Shared");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static showPosts = async (req, res) => {
        try {
            const postsData = await postModel.find();
            resBuilder(res, true, postsData, "All Posts");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static userPosts = async (req, res) => {
        try {
            const postsData = await postModel.find({
                userId: req.user._id,
            });
            resBuilder(res, true, postsData, "User Posts");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

    static singlePost = async (req, res) => {
        try {
            const postsData = await postModel.findById(req.params.id);
            resBuilder(res, true, postsData, "Single Post");
        } catch (e) {
            resBuilder(res, false, e, e.message);
        }
    };

}
module.exports = Post;
