import react, { Dispatch, ChangeEvent, SetStateAction } from "react";

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

export type InputType = {
  type?: string;
  value: string;
  placeholder?: string;
  checked?: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type SignUpDataType = {
  username: string;
  email: string;
  gender: string;
  password: string;
};
