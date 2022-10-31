const msgModel = require("../models/message.model");

// const io = (io) => {
//     io.on("connection", (socket) => {
//         socket.on("chat message", async (msg) => {
//             console.log(msg);
//             io.emit("chat message", msg);
//             // io.to("room1").emit("chat message", msg);
//         });
//     });
// };

// const io = (io) => {
// io.on("connection", (socket) => {
//     console.log(`User Connected`);
//     socket.on("msg", (data) => {
//         console.log("Hello", data);
//         // socket.emit("msg");
//         // io.emit("msg");
//         // socket.broadcast.emit("msg")
//     });

//     socket.on("send", ()=> {
//         console.log("Join")
//         io.to("myRoom").emit("Msg")
//     })
//     socket.on("join", ()=> {
//         socket.join("myRoom")
//         console.log("Send")
//     })
// });
// };

const io = (io) => {
    io.on("connection", (socket) => {
        // Recived Id From Angular
        socket.on("new Request", (id) => {
            socket.join(id);
            console.log("joined", id);
        });

        // Send Request To Angular
        // Data => Friend info
        socket.on("Send Friend Request", (data) => {
            console.log(data);
            socket.emit("Request Sended");
            io.to("Room Name").emit("new Friend Request", { img: data.img });
        });
    });
};

module.exports = io;
