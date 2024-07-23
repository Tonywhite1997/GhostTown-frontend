import { useState } from "react";

export function useShowPassword() {
  const [seePassword, setSeePassword] = useState(false);
  function handleShowPass() {
    setSeePassword((prev) => !prev);
  }
  return { handleShowPass, seePassword };
}

export function redirectToLogin(err: any, navigate: any) {
  let message: string;
  message = err?.response?.data.message;
  if (!message) message = err.message;

  if (message.toLowerCase() === "unauthorized") {
    navigate("/auth/login");
  }
}
