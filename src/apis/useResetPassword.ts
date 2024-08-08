import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";

function useResetPassword(
  resetToken: string,
  newPassword: string,
  navigate: any
) {
  const [isLoading, setIsLoading] = useState(false);

  async function resetPassword() {
    if (isLoading) return;

    if (!resetToken.trim() || !newPassword.trim())
      return toast("all fields required");

    try {
      setIsLoading(true);
      await axios.patch(`${BASE_URL}/auth/reset-password`, {
        resetToken: resetToken.trim(),
        newPassword: newPassword.trim(),
      });
      setIsLoading(false);
      toast("Password reset successfully");
      navigate("/auth/login");
    } catch (err: any) {
      setIsLoading(false);
      toast(err?.response?.data?.message);
    }
  }
  return { isLoading, resetPassword };
}

export default useResetPassword;
