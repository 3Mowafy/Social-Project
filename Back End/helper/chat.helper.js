const io = (io) => {
    io.on("connection", (socket) => {
        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });
    });
};

module.exports = io;
