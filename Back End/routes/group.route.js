const router = require("express").Router();
const Group = require("../controllers/group.controller");
const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const Post = require("../controllers/post.controller");

router.post("/addGroup", auth, Group.addGroup);
router.patch("/editGroup/:id", auth, Group.editGroup);
router.delete("/removeGroup/:id", auth, Group.removeGroup);

router.post(
    "/addGroupCoverImg/:id",
    auth,
    upload.single("img"),
    Group.addGroupCoverImg
);

router.post("/addPost/:id", auth, upload.single("img"), Group.addPost);

router.get("/showGroupPosts/:id", auth, Group.showGroupPosts)

module.exports = router;
