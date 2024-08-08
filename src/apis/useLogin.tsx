import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { AuthContextType } from "../types/types";
import { BASE_URL } from "../contexts/AuthContext";

export function useLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useContext<AuthContextType | null>(authContext);

  if (!context) {
    throw new Error("useLogin must be used within an AuthProvider");
  }

  const { setUser } = context;

  const navigate = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (isLoading) return;

    if (!username.trim() || !password.trim()) {
      return toast("username and password required");
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUser(data);
      setIsLoading(false);
      navigate("/feed");
    } catch (err: any) {
      toast(err?.response?.data?.message);
      setIsLoading(false);
    }
  }
  return { handleLogin, isLoading };
}
