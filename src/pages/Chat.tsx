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

  return (
    <main className="chat">
      <section className="old-chats">
        {!isLoading && chatRecipients.length < 1 && <p>No chats available</p>}

        {isLoading && <Loader />}

        {!isLoading &&
          chatRecipients.length > 0 &&
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
                <p>{recipient.username}</p>
              </Link>
            );
          })}
      </section>
      <section className="inbox">
        {!isFetching && !id && <p>No chat selected</p>}

        {isFetchingUser && <Loader />}

        {!isFetchingUser && id && (
          <div className="recipient-div">
            <div className="profile-pic">
              <img src={user?.profilePicURL} />
            </div>
            <p>{user?.username}</p>
          </div>
        )}

        {!isFetching && !isFetchingUser && messages.length === 0 && id && (
          <p className="no-message">No messages</p>
        )}

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
