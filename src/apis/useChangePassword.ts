import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";
import useLogout from "../apis/useLogout";
import { ChangePasswordType } from "../types/types";

function useChangePassword(newPasswordDetails: ChangePasswordType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { logout } = useLogout();

  async function changePassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!newPasswordDetails.oldPassword && !newPasswordDetails.newPassword)
      return toast("old and new passwords required");

    try {
      setIsLoading(true);

      await axios.patch(`${BASE_URL}/auth/change-password`, newPasswordDetails);

      toast("password changed successfully");
      logout();
      navigate("/auth/login");

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toast(err?.response?.data?.message);
    }
  }
  return { isLoading, changePassword };
}

export default useChangePassword;
