import PropTypes from "prop-types";

const ChatWindow = ({ onClose, conversations, selectedUser, onSelectUser, messages = [] }) => (
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
                    key={user.id}
                    className={`p-2 cursor-pointer hover:bg-gray-50 ${
                        selectedUser?.id === user.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => onSelectUser(user)}
                >
                    <p className="text-sm">{user.name}</p>
                </div>
                ))}
            </div>

            {/* Nội dung chat bên phải */}
            <div className="w-2/3 flex flex-col">
                {selectedUser ? (
                <>
                    <div className="flex-1 overflow-y-auto p-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 ${msg.sentByMe ? "text-right" : "text-left"}`}
                            >
                                <span
                                    className={`inline-block px-3 py-2 rounded-lg ${
                                    msg.sentByMe ? "bg-green-100" : "bg-gray-200"
                                    }`}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>
                </>
                ) : (
                    <p className="flex items-center justify-center h-full text-gray-500">
                        Chọn một người để bắt đầu chat.
                    </p>
                )}
            </div>
        </div>
    </div>
);
ChatWindow.propTypes = {
    onClose: PropTypes.func.isRequired,
    conversations: PropTypes.array.isRequired,
    selectedUser: PropTypes.object,
    onSelectUser: PropTypes.func.isRequired,
    messages: PropTypes.array
};

export default ChatWindow;