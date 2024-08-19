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
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
    uploadData?: any | undefined
  ) {
    // if (messageBody && uploadData) return toast("send either message or photo");

    async function sendAPI(payload: any, CType: string) {
      setIsSendingMessage(true);
      const { data } = await axios.post(
        `${BASE_URL}/messages/${userId}`,
        uploadData ? payload : { body: payload },
        {
          headers: {
            "Content-Type": CType,
          },
        }
      );

      if (auth?.user?.id === data.authorID) {
        setMessages((prev) => [...prev, data]);
      }

      setMessageBody("");

      setIsSendingMessage(false);
    }

    try {
      if (messageBody) {
        sendAPI(messageBody, "application/json");
      } else if (uploadData) {
        const photoData = new FormData();

        photoData.append("photo", uploadData);
        console.log(uploadData);

        sendAPI(photoData, "multipart/form-data");
      } else {
        return;
      }
    } catch (err: any) {
      console.log(err);

      setIsSendingMessage(false);
      toast("message not sent");
    }
  }

  return { sendMessage, isSendingMessage };
}

export default useMessage;
