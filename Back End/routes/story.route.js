const router = require("express").Router();
const Story = require("../controllers/story.controller");
const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post("/addStory", auth, upload.single("img"), Story.addStory);

router.delete("/removeStory/:id", auth, Story.removeStory);

router.get("/showStory", auth, Story.showStory);

module.exports = router;
