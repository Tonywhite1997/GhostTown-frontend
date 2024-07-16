import { useState } from "react";

export function useShowPassword() {
  const [seePassword, setSeePassword] = useState(false);
  function handleShowPass() {
    setSeePassword((prev) => !prev);
  }
  return { handleShowPass, seePassword };
}

export function redirectToLogin(err: any, navigate: any) {
  const { message } = err?.response?.data;

  if (message.toLowerCase() === "unauthorized") {
    navigate("/auth/login");
  }
}
