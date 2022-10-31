const express = require("express");
const path = require("path");
const cors = require("cors");
const socketIo = require("socket.io");
const server = express();

const serverHttp = require("http").createServer(server);
const io = socketIo(serverHttp);

require("dotenv").config();
require("../db/connect");
require("../helper/chat.helper")(io)

server.use(express.static(path.join(__dirname, "../static")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const userRoute = require("../routes/user.route");
const postRoute = require("../routes/post.route");
const groupRoute = require("../routes/group.route");
const storyRoute = require("../routes/story.route");
const chatRoute = require("../routes/chat.route");
const msgRoute = require("../routes/message.route");

server.use("/api/user", userRoute);
server.use("/api/chat", chatRoute);
server.use("/api/messages", msgRoute);
server.use("/api/post", postRoute);
server.use("/api/group", groupRoute);
server.use("/api/story", storyRoute);

server.all("*", (req, res) =>
    res
        .status(404)
        .send({ apiStatus: false, data: "", message: "Url Not Corrected" })
);


module.exports = serverHttp;
