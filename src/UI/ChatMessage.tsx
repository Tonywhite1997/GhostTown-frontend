import { useRef, useEffect } from "react";
import { MessageType } from "../types/types";
import { extractHourAndMinute } from "../utils/extractDate";

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
      endChatRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className="chat-box">
      {messages.length > 0 &&
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-container ${
              msg.authorID === loggedInUserId ? "right" : "left"
            }`}
          >
            <div
              key={msg.id}
              className={`message-box ${
                msg.authorID === loggedInUserId ? "right" : "left"
              }`}
            >
              <p>{msg.body}</p>
            </div>
            <small>{extractHourAndMinute(msg.created_at)}</small>
          </div>
        ))}
      <div ref={endChatRef}></div>
    </div>
  );
};

export default ChatMessage;
