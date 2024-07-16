import react, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContextType, UserType } from "../types/types";
import { redirectToLogin } from "../functions/generalfunction";
import LoaderPage from "../UI/LoaderPage";

export const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

export const authContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: react.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  async function getMe() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/me`);
      setUser(data);
      setIsLoading(false);

      if (
        location.pathname !== "/auth/signup" &&
        location.pathname !== "/auth/login"
      ) {
        return navigate(location.pathname);
      }

      navigate("/feed");
    } catch (err: any) {
      setIsLoading(false);
      location.pathname !== "/auth/signup" &&
        toast(err?.response?.data?.message);
      redirectToLogin(err, navigate);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <authContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </authContext.Provider>
  );
}
