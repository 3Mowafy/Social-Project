const server = require("./scr/server");

server.listen(process.env.PORT, () =>
    console.log(`Go On http://127.0.0.1:${process.env.PORT}`)
);
