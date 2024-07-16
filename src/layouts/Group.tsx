import { ReactNode } from "react";
import Header from "./Header";

function Group({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Group;
