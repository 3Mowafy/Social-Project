const router = require("express").Router();
const Msg = require("../controllers/message.controller");
const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/msgData/:id", auth , Msg.messages)

module.exports = router;
