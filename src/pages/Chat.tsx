import { useEffect, useContext, useState, ChangeEvent } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import useChat from "../apis/useChat";
import Loader from "../UI/Loader";
import { authContext, BASE_URL } from "../contexts/AuthContext";
import ChatMessage from "../UI/ChatMessage";
import useUser from "../apis/useUser";
import useMessage from "../apis/useMessage";
import useListenMessage from "../apis/useListenMessage";
import useListenRecipients from "../apis/useListenRecipients";
import { useSocketContext } from "../contexts/SocketContext";
import { useDeviceWidth } from "../utils/calculateDeviceWidth";
import axios from "axios";
import { lastMessageDate } from "../utils/formatDate";
import { AuthContextType, UserType } from "../types/types";

function Chat() {
  const [messageBody, setMessageBody] = useState<string>("");

  function getMessageBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessageBody(e.target.value);
  }

  const {
    getChatsRecipients,
    isLoading,
    chatRecipients,
    setChatRecipients,
    getChat,
    isFetching,
    messages,
    setMessages,
  } = useChat();

  const deviceWidth = useDeviceWidth();

  const { id } = useParams();

  useListenMessage(setMessages, id);

  useListenRecipients(setChatRecipients);

  const { onlineUsers } = useSocketContext();

  const { getUser, isFetchingUser, user } = useUser();

  const { isSendingMessage, sendMessage } = useMessage();

  const auth = useContext(authContext);

  useEffect(() => {
    if (auth && auth.user?.username) {
      getChatsRecipients();
    }
  }, [auth && auth.user?.username]);

  useEffect(() => {
    if (id && auth && auth.user?.username) {
      getUser(id);
    }
  }, [id, auth && auth.user?.username]);

  async function readMessage() {
    return await axios.patch(`${BASE_URL}/chats/${id}`);
  }

  useEffect(() => {
    if (id && !isFetching && auth && auth.user?.id) {
      readMessage();
    }
  }, [id, auth && auth.user?.id, isFetching]);

  useEffect(() => {
    if (id && auth && auth.user?.username && chatRecipients.length > 0) {
      getChat(id);
    }
  }, [id, auth && auth.user?.username, chatRecipients]);

  if (auth && !auth.user?.id) {
    return (
      <div className="main">
        <p>server Error</p>
      </div>
    );
  }

  return (
    <main className="chat">
      <section
        className={`old-chats ${
          (deviceWidth < 700 && !id) || deviceWidth > 700 ? "show" : "hide"
        }`}
        style={{
          width: deviceWidth < 700 ? "100%" : "250px",
        }}
      >
        {!isLoading && chatRecipients?.length < 1 && auth && auth.user?.id && (
          <p className="response-text">No chats available</p>
        )}

        {auth && !auth.user?.id && (
          <p className="response-text">Server Error</p>
        )}

        {isLoading && <Loader />}

        {!isLoading &&
          chatRecipients?.length > 0 &&
          auth &&
          auth.user?.id &&
          chatRecipients?.map((recipient) => {
            return (
              <Link
                to={`/chats/${recipient.id}`}
                key={recipient.id}
                className="recipient"
              >
                <div className="profile-pic">
                  <img src={recipient.profilePicURL} />
                  <div
                    className={
                      onlineUsers.includes(recipient.id)
                        ? "online-status online"
                        : "online-status offline"
                    }
                  ></div>
                </div>
                <div className="message-details-container">
                  <p>{recipient.username}</p>
                  <div className="last-message-div">
                    <p className="last-message">{recipient.last_message}</p>
                    <p className="last-message-time">
                      {lastMessageDate(recipient.last_message_timeStamp)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </section>
      <section
        className={`inbox ${
          (deviceWidth < 700 && id) || deviceWidth > 700 ? "show" : "hide"
        }`}
        style={{
          width: deviceWidth < 700 ? "100%" : " ",
        }}
      >
        {!isFetching && !id && auth && auth.user?.id && <p>No chat selected</p>}

        {isFetchingUser && <Loader />}

        {!isFetchingUser && id && auth && auth.user?.id && (
          <div className="recipient-div">
            <div className="profile-pic">
              <img src={user?.profilePicURL} />
            </div>
            <div>
              <p>{user?.username}</p>
              <p className="status">
                {user?.id && onlineUsers.includes(user?.id)
                  ? "online"
                  : "offline"}
              </p>
            </div>
          </div>
        )}

        {!isFetching &&
          !isFetchingUser &&
          messages.length === 0 &&
          id &&
          auth &&
          auth.user?.id && (
            <p className="response-text no-message">No messages</p>
          )}
        {auth && !auth.user?.id && (
          <p className="response-text">Server Error</p>
        )}

        {auth && auth.user?.id && !isFetching && id && (
          <ChatMessage messages={messages} loggedInUserId={auth.user?.id} />
        )}

        <div className="input-container">
          <label className="textarea-label">
            <textarea
              placeholder="message"
              name="messageBody"
              value={messageBody}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                getMessageBody(e)
              }
            />
          </label>
          <button
            className="send-icon"
            onClick={() => {
              id && sendMessage(id, messageBody, setMessageBody, setMessages);
            }}
            disabled={isSendingMessage}
          >
            {isSendingMessage && <Loader color="white" />}
            {!isSendingMessage && <FaPaperPlane className="icon" />}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Chat;
