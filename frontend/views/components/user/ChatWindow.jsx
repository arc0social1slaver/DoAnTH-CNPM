import PropTypes from "prop-types";
import { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import getBEURL from "../../utils/backendURL";

const ChatWindow = ({ getMessages, messEnd, socket, roomID, onClose, conversations, selectedUser, onSelectUser, messages = [] }) => {
    
    const item = sessionStorage.getItem('user');
    
    const curUser = item ? JSON.parse(item): {};
    const [newMess , setNewMess] = useState('');
    const handleSendMess = async (e) => {
        e.preventDefault();
        if(newMess == '') {
             Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: "Tin nhắn không được để trống",
                                showConfirmButton: true,
                                timer: 1500
            });
        }
        else {
            // await axios.post(`${getBEURL()}/api/messages`, {
            //   "chatID": roomID,
            //   "senderID": curUser._id,
            //   "content": newMess  
            // })
            socket.emit("sendMessage", {
                  "chatID": roomID,
                  "senderID": curUser._id,
                  "content": newMess  
            })
            getMessages(roomID);
        }
        setNewMess('')
    }
    return (
    <div className="fixed bottom-0 right-0 w-1/2 h-3/4 bg-green-700 rounded-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b">
            <h3 className="text-md text-colors-white font-bold ml-2">Chat</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <div className="flex flex-1 bg-colors-white">
        
            {/* Danh sách người dùng bên trái */}
            <div className="w-1/3 border-r overflow-y-auto">
                <div className="flex items-center p-2 border-b">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-5 absolute text-gray-400 ml-2"
                    >
                            <path 
                                strokeLinecap="round"  
                                strokeLinejoin="round" 
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                    </svg>

                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full pl-8 p-2 border border-gray-200 rounded-3xl focus:outline-none"
                    />
                </div>
                {conversations.map((user) => (
                <div
                    key={user._id}
                    className={`p-2 cursor-pointer hover:bg-gray-50 ${
                        selectedUser?._id === user._id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => onSelectUser(user)}
                >
                    <p className="text-sm">{user.name !== '' ? user.name : user.username}</p>
                </div>
                ))}
            </div>

            {/* Nội dung chat bên phải */}
            <div className="w-2/3 flex flex-col">
                
                {selectedUser ? (
                <>
                    <div className="flex-1 overflow-y-auto p-4 max-h-[435px]">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 ${msg.senderID === curUser._id ? "text-right" : "text-left"}`}
                            >
                                <span
                                    className={`inline-block px-3 py-2 rounded-lg ${
                                    msg.senderID === curUser._id ? "bg-green-100" : "bg-gray-200"
                                    }`}
                                >
                                    {msg.content}
                                </span>
                            </div>
                        ))}
                        <div style={{float: "left", clear: "both"}} ref={messEnd}/>
                    </div>
                    <form className="p-2 border-t" onSubmit={handleSendMess}>
                        <input
                            type="text"
                            value={newMess}
                            placeholder="Nhập tin nhắn..."
                            onChange={(e) => setNewMess(e.target.value)}
                            className="w-[90%] border p-2 rounded-lg"
                        />
                        <button type="submit" className="ml-2 round-lg">
                        <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                        >
                            <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" />
                        </svg>
                        </button>
                    </form>
                </>
                ) : (
                    <p className="flex items-center justify-center h-full text-gray-500">
                        Chọn một người để bắt đầu chat.
                    </p>
                )}
            </div>
        </div>
    </div>
)};
ChatWindow.propTypes = {
    onClose: PropTypes.func.isRequired,
    conversations: PropTypes.array.isRequired,
    selectedUser: PropTypes.object,
    onSelectUser: PropTypes.func.isRequired,
    messages: PropTypes.array
};

export default ChatWindow;