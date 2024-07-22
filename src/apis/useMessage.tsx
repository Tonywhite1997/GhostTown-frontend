import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";
import { MessageType } from "../types/types";

function useMessage() {
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

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

      setMessages((prev) => [...prev, data]);
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
