import axios from "axios";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";
import { SignUpDataType } from "../types/types";

function useSignUp({ username, email, password, gender }: SignUpDataType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    if (isLoading) return;

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !gender.trim()
    ) {
      return toast("all fields required");
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/auth/register`,
        {
          username,
          email,
          password,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      toast("Signed up successfully");
      setIsLoading(false);
      navigate("/auth/login");
    } catch (err: any) {
      setIsLoading(false);
      toast(err?.response?.data.message);
    }
  }
  return { isLoading, handleSignUp };
}

export default useSignUp;
