import react, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContextType, UserType } from "../types/types";
import Loader from "../UI/Loader";

export const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

export const authContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: react.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function getMe() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/me`);
      setUser(data);
      setIsLoading(false);
      navigate("/signup");
    } catch (err: any) {
      setIsLoading(false);
      toast(err?.response?.data?.message);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <authContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </authContext.Provider>
  );
}
