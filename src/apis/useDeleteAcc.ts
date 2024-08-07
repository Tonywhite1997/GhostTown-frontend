import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";

export const useDeleteAccount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function deleteAccount(input: string) {
    if (!input) return toast("enter your password");

    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/auth`, {
        data: {
          password: input,
        },
      });
      toast("account deleted");
      navigate("/auth/login");
      setIsLoading(false);
    } catch (err: any) {
      toast(err?.response?.data?.message);
      setIsLoading(false);
    }
  }
  return { deleteAccount, isLoading };
};
