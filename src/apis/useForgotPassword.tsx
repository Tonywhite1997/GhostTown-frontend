import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";

function useForgotPassword(userEmail: string, navigate: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function sendResetToken() {
    if (!userEmail.trim()) return toast("email is required");

    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.patch(`${BASE_URL}/auth/forgot-password`, {
        email: userEmail,
      });
      setIsLoading(false);
      toast("Token sent");
      navigate("/auth/reset-password");
    } catch (err: any) {
      setIsLoading(false);
      toast(err?.response?.data?.message);
    }
  }
  return { sendResetToken, isLoading };
}

export default useForgotPassword;
