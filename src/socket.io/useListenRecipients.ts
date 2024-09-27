import { SetStateAction, Dispatch, useEffect } from "react";
import { RecipientType } from "../types/types";
import { useSocketContext } from "../contexts/SocketContext";

function useListenRecipients(
  setChatRecipients: Dispatch<SetStateAction<RecipientType[]>>
) {
  const { socket } = useSocketContext();
  useEffect(() => {
    if (!socket) return;

    const handleChatRecipients = (chatRecipients: RecipientType[]) => {
      setChatRecipients(chatRecipients);
    };

    socket.on("chatRecipients", handleChatRecipients);

    return () => {
      socket.off("chatRecipients", handleChatRecipients);
    };
  }, [setChatRecipients, socket]);
}

export default useListenRecipients;
