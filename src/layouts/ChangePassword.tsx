import React from "react";
import Header from "./Header";

function ChangePassword({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default ChangePassword;
