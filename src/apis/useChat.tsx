import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";
import { MessageType, RecipientType } from "../types/types";

function useChat() {
  const [chatRecipients, setChatRecipients] = useState<RecipientType[]>([]);
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetcing] = useState<boolean>(false);

  async function getChatsRecipients() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/chats`);
      setChatRecipients(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toast("Can't fetch request");
    }
  }

  async function getChat(id: string) {
    setIsFetcing(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/chats/${id}`);
      setMessages(data);
      setIsFetcing(false);
    } catch (err: any) {
      setIsFetcing(false);
      toast("Can't fetch request");
    }
  }
  return {
    isLoading,
    chatRecipients,
    setChatRecipients,
    getChatsRecipients,
    messages,
    setMessages,
    getChat,
    isFetching,
  };
}

export default useChat;
