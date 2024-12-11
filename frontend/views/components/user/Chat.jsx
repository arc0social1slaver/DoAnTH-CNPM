import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

const ChatApp = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const conversations = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const messages = [
    { text: "Xin chào!", sentByMe: false },
    { text: "Chào bạn!", sentByMe: true },
  ];

  return (
    <>
      {/* Nút Chat */}
      <ChatButton onClick={() => setChatOpen(true)} />

      {/* Khung Chat */}
      {isChatOpen && (
        <ChatWindow
          onClose={() => setChatOpen(false)}
          conversations={conversations}
          selectedUser={selectedUser}
          onSelectUser={(user) => setSelectedUser(user)}
          messages={messages}
        />
      )}
    </>
  );
};

export default ChatApp;
