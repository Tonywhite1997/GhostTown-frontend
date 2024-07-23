import {
  ReactNode,
  useContext,
  createContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { authContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";

type SocketType = {
  socket: Socket | null;
  onlineUsers: string[];
};

const SocketURL =
  process.env.REACT_APP_ENV === "development" ? "http://localhost:5000" : "";

const socketContext = createContext<SocketType | undefined>(undefined);

export function useSocketContext(): SocketType {
  const context = useContext(socketContext);
  if (!context)
    throw new Error("useSocketContext must be used with SocketContextProvider");
  return context;
}

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const auth = useContext(authContext);

  if (!auth) throw new Error("useAuth must be used within useAuthProvider");

  const { isLoading, user } = auth;

  useEffect(() => {
    if (user?.username && !isLoading) {
      const socket = io(SocketURL, {
        query: {
          userId: auth.user?.id,
        },
      });
      socketRef.current = socket;

      socket.on("onlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else {
      if (!user?.username && !isLoading) {
        socketRef.current?.close();
        socketRef.current = null;
      }
    }
  }, [auth.user?.username, isLoading]);

  return (
    <socketContext.Provider value={{ onlineUsers, socket: socketRef.current }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;
