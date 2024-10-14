import { useRef, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { MessageType } from "../types/types";
import { groupedMessage } from "../utils/formatDate";
import ViewPhoto from "../pages/ViewPhoto";
import Loader from "./Loader";

const ChatMessage = ({
  messages,
  loggedInUserId,
}: {
  messages: MessageType[];
  loggedInUserId: string;
}) => {
  const [viewPhoto, setViewPhoto] = useState<boolean>(false);
  const [photoURL, setPhotoURL] = useState<string>("");
  const endChatRef = useRef<HTMLDivElement | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const groupedMessages = groupedMessage(messages || []);

  function handleImageLoad() {
    setIsImageLoading(false);
  }

  useEffect(() => {
    if (endChatRef.current) {
      endChatRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className="chat-box">
      {Object.entries(groupedMessages).map(([date, data]) => (
        <div key={date} className="message-group">
          <h3 className="date-heading">{date}</h3>
          {data.map((msg) => (
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
                {msg.photoURL && (
                  <div className="photo-wrapper">
                    {isImageLoading && <Loader />}
                    <img
                      alt="new from sender"
                      src={msg.photoURL}
                      onClick={() => {
                        setViewPhoto(true);
                        {
                          msg.photoURL && setPhotoURL(msg.photoURL);
                        }
                      }}
                      onLoad={handleImageLoad}
                    />
                  </div>
                )}
              </div>
              <small className="time">
                {format(parseISO(msg.created_at), "p")}
              </small>
            </div>
          ))}
        </div>
      ))}

      {viewPhoto && (
        <ViewPhoto photoURL={photoURL} setViewPhoto={setViewPhoto} />
      )}

      <div ref={endChatRef}></div>
    </div>
  );
};

export default ChatMessage;
