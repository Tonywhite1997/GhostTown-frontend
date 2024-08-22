import { SetStateAction, Dispatch, useEffect } from "react";
import { RecipientType } from "../types/types";
import { useSocketContext } from "../contexts/SocketContext";

function useListenRecipients(
  setChatRecipients: Dispatch<SetStateAction<RecipientType[]>>
) {
  const { socket } = useSocketContext();
  useEffect(() => {
    if (!socket) return;

    const handleNewRecipient = (recipient: RecipientType) => {
      setChatRecipients((prevRecipients: RecipientType[]) => {
        if (prevRecipients.some((x) => x.id === recipient.id)) {
          return prevRecipients;
        } else {
          return [...prevRecipients, recipient];
        }
      });
    };

    socket.on("newRecipient", handleNewRecipient);

    return () => {
      socket.off("newRecipient", handleNewRecipient);
    };
  }, [setChatRecipients, socket]);
}

export default useListenRecipients;
