import { useEffect, useContext, useState, ChangeEvent } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import useChat from "../apis/useChat";
import Loader from "../UI/Loader";
import { authContext } from "../contexts/AuthContext";
import ChatMessage from "../UI/ChatMessage";
import useUser from "../apis/useUser";
import useMessage from "../apis/useMessage";
import useListenMessage from "../apis/useListenMessage";
import useListenRecipients from "../apis/useListenRecipients";
import { useSocketContext } from "../contexts/SocketContext";

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

  const { id } = useParams();

  useListenMessage(setMessages, id);

  useListenRecipients(setChatRecipients);

  const { onlineUsers } = useSocketContext();

  const { getUser, isFetchingUser, user } = useUser();

  const { isSendingMessage, sendMessage } = useMessage();

  const auth = useContext(authContext);

  if (!auth) {
    throw new Error("Auth Error");
  }

  useEffect(() => {
    if (auth.user?.username) {
      getChatsRecipients();
    }
  }, [auth.user?.username]);

  useEffect(() => {
    if (id && auth.user?.username) {
      getUser(id);
    }
  }, [id, auth.user?.username]);

  useEffect(() => {
    if (id && auth.user?.username && chatRecipients.length > 0) {
      getChat(id);
    }
  }, [id, auth.user?.username, chatRecipients]);

  if (!auth.user?.id) {
    return (
      <div className="main">
        <p>server Error</p>
      </div>
    );
  }

  return (
    <main className="chat">
      <section className="old-chats">
        {!isLoading && chatRecipients.length < 1 && auth.user?.id && (
          <p>No chats available</p>
        )}

        {!auth.user?.id && <p>Server Error</p>}

        {isLoading && <Loader />}

        {!isLoading &&
          chatRecipients.length > 0 &&
          auth.user?.id &&
          chatRecipients.map((recipient) => {
            return (
              <Link
                to={`/chats/${recipient.id}`}
                key={recipient.id}
                className="recipient"
              >
                <div className="profile-pic">
                  <img src={recipient.profilePicURL} />
                </div>
                <div>
                  <p>{recipient.username}</p>
                  <p className="status">
                    {onlineUsers.includes(recipient.id) ? "online" : "offline"}
                  </p>
                </div>
              </Link>
            );
          })}
      </section>
      <section className="inbox">
        {!isFetching && !id && auth.user?.id && <p>No chat selected</p>}

        {isFetchingUser && <Loader />}

        {!isFetchingUser && id && auth.user?.id && (
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
          auth.user?.id && <p className="no-message">No messages</p>}
        {!auth.user?.id && <p>Server Error</p>}

        {auth.user?.id && !isFetching && id && (
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
