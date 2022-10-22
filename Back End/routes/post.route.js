const router = require("express").Router();
const Post = require("../controllers/post.controller");
const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post("/addPost", auth, upload.single("img"), Post.addPost);
router.patch("/editPost/:id", auth, upload.single("img"), Post.editPost);
router.delete("/removePost/:id", auth, Post.removePost);

router.post("/sharePost/:id", auth, Post.sharePost);

router.post("/addRemoveLike/:id", auth, Post.addRemoveLike);

router.post("/addComment/:id", auth, upload.single("img"), Post.addComment);
router.patch(
    "/editComment/:id/:commentId",
    auth,
    upload.single("img"),
    Post.editComment
);
// router.patch(
//     "/editCommentImg/:id/:commentId",
//     auth,
//     upload.single("img"),
//     Post.editCommentImg
// );
router.delete("/removeComment/:id/:commentId", auth, Post.removeComment);

router.get("/posts", Post.showPosts);
router.get("/userPosts", auth, Post.userPosts);
router.get("/singlePost/:id", auth, Post.singlePost);

module.exports = router;
