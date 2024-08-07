import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";

function useLogout() {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const navigate = useNavigate();

  async function logout() {
    setIsLogout(true);
    try {
      await axios.get(`${BASE_URL}/auth/logout`);

      setIsLogout(false);

      toast("Logout successfully");
      navigate("/auth/login");
    } catch (err: any) {
      toast(err?.response?.data?.message);
    }
  }

  return { logout, isLogout };
}

export default useLogout;
