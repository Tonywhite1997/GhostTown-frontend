import React from "react";
import Header from "./Header";

function DeleteAccount({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default DeleteAccount;
