import { useState } from "react";

export function useShowPassword() {
  const [seePassword, setSeePassword] = useState(false);
  function handleShowPass() {
    setSeePassword((prev) => !prev);
  }
  return { handleShowPass, seePassword };
}
