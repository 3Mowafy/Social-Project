const router = require("express").Router();
const User = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware")

router.post("/register", User.addUser);
router.post("/login", User.login);

router.get("/profile", auth, User.profile);

router.get("/status", auth, User.status);

router.patch("/editProfile", auth, User.editProfile);
router.patch("/addProfileIamge", auth, upload.single("img"), User.addProfileIamge);
router.patch("/addProfileCoverIamge", auth, upload.single("img"), User.addProfileCoverIamge);

router.delete("/removeProfile", auth, User.removeProfile);

router.get("/logout", auth, User.logout);

module.exports = router;
