import axios from "axios";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";
import { MessageType } from "../types/types";
import { authContext } from "../contexts/AuthContext";

function useMessage() {
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const auth = useContext(authContext);

  if (!auth) throw new Error("auth should be within authProvider");

  async function sendMessage(
    userId: string | undefined,
    messageBody: string | undefined,
    setMessageBody: React.Dispatch<React.SetStateAction<string>>,
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
  ) {
    if (!messageBody) return;
    setIsSendingMessage(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/messages/${userId}`,
        { body: messageBody },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (auth?.user?.id === data.authorID) {
        setMessages((prev) => [...prev, data]);
      }

      setMessageBody("");

      setIsSendingMessage(false);
    } catch (err: any) {
      setIsSendingMessage(false);
      toast("message not sent");
    }
  }

  return { sendMessage, isSendingMessage };
}

export default useMessage;
