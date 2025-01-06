import React, { useEffect, useRef, useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import axios from "axios";
import getBEURL from "../../utils/backendURL";
import Swal from "sweetalert2";
import {io} from "socket.io-client";
import getSocketURL from "../../utils/socketURL";

const ChatApp = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [roomID, setRoomID] = useState('');
  let workaround = ''
  const messEnd = useRef();
  const scrollToBottom = () => {
    if(messEnd.current) {
      
    messEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  const getAllUser = async () => {
    const item = sessionStorage.getItem('user');
    const curUser = item ? JSON.parse(item) : {};
    await axios.get(`${getBEURL()}/api/users/norm-user/${curUser._id}`, {
      headers: {
        "Content-Type": 'application/json',
      }
    })
    .then((val) => {
      setConversations(val.data.users)
    })
      .catch((error) => {
        console.log(error);
        Swal.fire({
              position: "center",
              icon: "error",
              title: "Lỗi nhận người dùng",
              showConfirmButton: true,
              timer: 1500
        });
      })
  }
  const handleRoom = async (user) => {
    const item = sessionStorage.getItem('user');
    const curUser = item ? JSON.parse(item) : {};
    setSelectedUser(user)
    const response = await axios.post(`${getBEURL()}/api/chat-rooms/create-room`, {
      "firstID": curUser._id,
      "secondID": user._id
    }, {
      headers: {
        "Content-Type": 'application/json',
      }
    })
    .then((val) => {
      // roomID = val.data.chat_room._id;
      setRoomID(val.data.chat_room._id);
      workaround = val.data.chat_room._id;
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
            position: "center",
            icon: "error",
            title: "Lỗi không thể tạo phòng chat",
            showConfirmButton: true,
            timer: 1500
      });
    })
    if(workaround != '') {
      // console.log(workaround);

      socket.emit("enter-room", workaround);
      // socket.on("get-mess", (resp) => {
      //   setMessages(resp);
      // });
      // await axios.get(`${getBEURL()}/api/messages/${roomID}`)
      //   .then((val) => {
          
      //     setMessages(val.data.all_mess)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     Swal.fire({
      //           position: "top-end",
      //           icon: "error",
      //           title: "Cannot get messages",
      //           showConfirmButton: true,
      //           timer: 1500
      //     });
      //   })
    }
    // console.log(messages);
    
  }
  // const conversations = [
  //   { id: 1, name: "Alice" },
  //   { id: 2, name: "Bob" },
  //   { id: 3, name: "Charlie" },
  // ];
  useEffect(() => {
    const activateTheUser = async (mySocket, user_id) => {
      mySocket.emit("activateUser", user_id);
    }
    const deActiveTheUser = async (mySocket) => {
      mySocket.disconnect();
    }
    if(sessionStorage.getItem('user')) {
   const newSocket = io(`${getSocketURL()}`);
   const user_id = JSON.parse(sessionStorage.getItem('user'))._id
      setSocket(newSocket);
      // newSocket.emit("activateUser", user_id)
      activateTheUser(newSocket, user_id)
    getAllUser()
    return () => {
      // newSocket.disconnect()
      deActiveTheUser(newSocket)
    }
    }
  }, [])
  useEffect(() => {
    if(roomID != '') {
      console.log(roomID);
      
      socket.on("get-message", () => {
        getMessages(roomID)
        // axios.get(`${getBEURL()}/api/messages/${roomID}`)
        // .then((val) => {
        //   setMessages(val.data.all_mess)
        //   // console.log(val);
          
        // })
        // .catch((error) => {
        //   console.log(error);
        //   Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         title: "Lỗi tin nhắn",
        //         showConfirmButton: true,
        //         timer: 1500
        //   });
        // })
        // console.log("Received here")
      })
      return () => {
        socket.off("get-message")
      }
    }
  }, [socket, roomID]);

  useEffect(() => {
    scrollToBottom()
  });
  const getMessages = async (roomID) => {
    try {
      const resp = await axios.get(`${getBEURL()}/api/messages/${roomID}`)
      setMessages(resp.data.all_mess)
    } catch (error) {
      console.log(error);
      Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi tin nhắn",
                showConfirmButton: true,
                timer: 1500
      });
    }
    // axios.get(`${getBEURL()}/api/messages/${roomID}`)
    //     .then((val) => {
    //       setMessages(val.data.all_mess)
    //       // console.log(val);
          
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       Swal.fire({
    //             position: "center",
    //             icon: "error",
    //             title: "Lỗi tin nhắn",
    //             showConfirmButton: true,
    //             timer: 1500
    //       });
    //     })
  }
  // const messages = [
  //   { text: "Xin chào!", sentByMe: false },
  //   { text: "Chào bạn!", sentByMe: true },
  // ];

  return (
    <>
      {/* Nút Chat */}
      <ChatButton onClick={() => setChatOpen(true)} />

      {/* Khung Chat */}
      {isChatOpen && (
        <ChatWindow
          messEnd={messEnd}
          socket={socket}
          roomID={roomID}
          onClose={() => setChatOpen(false)}
          conversations={conversations}
          selectedUser={selectedUser}
          onSelectUser={(user) => handleRoom(user)}
          messages={messages}
          // getMessages={getMessages}
        />
      )}
    </>
  );
};

export default ChatApp;
