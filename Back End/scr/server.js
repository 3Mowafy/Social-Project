const express = require("express");
const path = require("path");
const cors = require("cors");
const server = express();

require("dotenv").config();
require("../db/connect");

server.use(express.static(path.join(__dirname, "../static")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const groupRoute = require("../routes/group.route");
const postpRoute = require("../routes/post.route");
const userRoute = require("../routes/user.route");

server.use("/api/group", groupRoute);
server.use("/api/post", postpRoute);
server.use("/api/user", userRoute);

server.all("*", (req, res) =>
    res
        .status(404)
        .send({ apiStatus: false, data: "", message: "Url Not Corrected" })
);

module.exports = server;
