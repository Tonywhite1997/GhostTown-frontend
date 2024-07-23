import { SetStateAction, Dispatch, useEffect } from "react";
import { UserType } from "../types/types";
import { useSocketContext } from "../contexts/SocketContext";

function useListenRecipients(
  setChatRecipients: Dispatch<SetStateAction<UserType[]>>
) {
  const { socket } = useSocketContext();
  useEffect(() => {
    socket?.on("newReceipient", (recipient) => {
      setChatRecipients((recipients) => [...recipients, recipient]);
    });
  }, [socket]);
}

export default useListenRecipients;
