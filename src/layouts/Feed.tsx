import { ReactNode } from "react";
import Header from "./Header";

function Feed({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Feed;
