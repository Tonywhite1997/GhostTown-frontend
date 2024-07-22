import { useRef, useEffect } from "react";
import { MessageType } from "../types/types";

const ChatMessage = ({
  messages,
  loggedInUserId,
}: {
  messages: MessageType[];
  loggedInUserId: string;
}) => {
  const endChatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endChatRef.current) {
      endChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="chat-box">
      {messages &&
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-box ${
              msg.authorID === loggedInUserId ? "right" : "left"
            }`}
          >
            {msg.body}
          </div>
        ))}
      <div ref={endChatRef}></div>
    </div>
  );
};

export default ChatMessage;
