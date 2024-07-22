import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../contexts/AuthContext";
import { UserType } from "../types/types";

function useUser() {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);

  async function getUser(userId: string) {
    setIsFetchingUser(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
      setUser(data);
      setIsFetchingUser(false);
    } catch (err: any) {
      setIsFetchingUser(false);
      toast(err?.data?.response.message);
    }
  }
  return { getUser, isFetchingUser, user };
}

export default useUser;
