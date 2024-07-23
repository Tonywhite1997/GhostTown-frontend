import { useEffect, Dispatch, SetStateAction } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { MessageType } from "../types/types";

function useListenMessage(
  setMessages: Dispatch<SetStateAction<MessageType[]>>,
  id: string | undefined
) {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      if (id && id === newMessage.authorID) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [id, socket, setMessages]);
}

export default useListenMessage;
