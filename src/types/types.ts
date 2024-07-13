import { Dispatch, SetStateAction } from "react";

export type LoginDataType = {
  username: string;
  password: string;
};

export type UserType = {
  id: string;
  profilePicURL: string;
  username: string;
};

export type AuthContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
