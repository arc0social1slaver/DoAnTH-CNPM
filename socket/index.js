require("dotenv").config();


const { Server } = require("socket.io");
const axios = require("axios");
const PORT = process.env.PORT || 4000;
const FE = process.env.FRONTEND;
const BE = process.env.BACKEND;


const io = new Server({cors: FE});

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("sendMessage", (message) => {
    // console.log(message);
    axios({
      method: "post",
      url: `${BE}/api/messages`,
      data: message
    })
    .catch((error) => console.log(error))
    io.to(message.chatID).emit("get-message");
    // io.to(socket.id).emit("get-message")
  })
  socket.on("enter-room", (roomID) => {
    
    if(!socket.rooms.has(roomID)) {
      console.log(`Have not joined ${roomID}`);
      socket.join(roomID)
    }
    else {
      console.log(`Have joined ${roomID}`);
    }
    io.to(roomID).emit("get-message");
  })
  // socket.("get-message", () => {
  //   axios
  // })
});

io.listen(PORT);