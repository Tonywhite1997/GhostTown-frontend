import { useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { MessageType } from "../types/types";
import { groupMessagesByDate } from "../utils/formatDate";

const ChatMessage = ({
  messages,
  loggedInUserId,
}: {
  messages: MessageType[];
  loggedInUserId: string;
}) => {
  const endChatRef = useRef<HTMLDivElement | null>(null);
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    if (endChatRef.current) {
      endChatRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className="chat-box">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date} className="message-group">
          <h3 className="date-heading">{date}</h3>
          {msgs.map((msg) => (
            <div
              key={msg.id}
              className={`message-container ${
                msg.authorID === loggedInUserId ? "right" : "left"
              }`}
            >
              <div
                style={{
                  backgroundColor: msg.photoURL ? "white" : "",
                  padding: msg.photoURL ? "0" : "",
                }}
                className={`message-box ${
                  msg.authorID === loggedInUserId ? "right" : "left"
                }`}
              >
                {msg.body && <p>{msg.body}</p>}
                {msg.photoURL && <img src={msg.photoURL} />}
              </div>
              <small className="time">
                {format(parseISO(msg.created_at), "p")}
              </small>
            </div>
          ))}
        </div>
      ))}
      <div ref={endChatRef}></div>
    </div>
  );
};

export default ChatMessage;
