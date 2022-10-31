const router = require("express").Router();
const Chat = require("../controllers/chat.controller");
const { auth } = require("../middleware/auth.middleware");

router.post("/chatData/:id", auth , Chat.initChat)
// router.post("/removeChat/:id", auth , Chat.removeChat)

module.exports = router;
