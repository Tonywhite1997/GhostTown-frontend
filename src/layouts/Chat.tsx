import { ReactNode } from "react";
import Header from "./Header";

function Chat({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Chat;
