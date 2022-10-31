const router = require("express").Router();
const User = require("../controllers/user.controller");
const { auth, removeReq } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post("", (req, res) => {
  res.send("Hello");
});

router.post("/register", User.addUser);
router.post("/login", User.login);

router.get("/profile", auth, User.profile);

router.post("/sendRequest/:id", auth, User.sendRequest);
router.patch("/acceptRequest/:id", auth, removeReq, User.acceptRequest);
router.delete("/rmRejCanRequest/:id", auth, User.rmRejCanRequest);
router.delete("/removeFriend/:id", auth, User.removeFriend);

router.get("/status", auth, User.status);

router.patch("/editProfile", auth, User.editProfile);
router.patch(
  "/addProfileImage",
  auth,
  upload.single("img"),
  User.addProfileImage
);
router.patch(
  "/addProfileCoverIamge",
  auth,
  upload.single("img"),
  User.addProfileCoverIamge
);

router.delete("/removeProfile", auth, User.removeProfile);

router.get("/logout", auth, User.logout);

router.get("/users", auth, User.showUsers);
router.get("/singleUser/:id", auth, User.singleUser);

module.exports = router;
