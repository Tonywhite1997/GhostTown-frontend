import { ReactNode } from "react";
import Header from "./Header";

function Me({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Me;
