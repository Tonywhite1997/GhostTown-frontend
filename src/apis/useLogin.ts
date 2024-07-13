import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { AuthContextType } from "../types/types";

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

  async function handleLogin() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
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
      toast("logged in successfully");
      navigate("/signup");
    } catch (err: any) {
      toast(err?.response?.data?.message);
      setIsLoading(false);
    }
  }
  return { handleLogin, isLoading };
}
