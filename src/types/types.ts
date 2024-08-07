import react, { Dispatch, ChangeEvent, SetStateAction } from "react";

export type LoginDataType = {
  username: string;
  password: string;
};

export type UserType = {
  id: string;
  profilePicURL: string;
  username: string;
  email: string;
};

export type ChangePasswordType = {
  newPassword: string;
  oldPassword: string;
};

export type RecipientType = {
  id: string;
  profilePicURL: string;
  username: string;
  unread_count: number;
  last_message: string;
  last_message_timeStamp: string;
};

export type MessageType = {
  body: string;
  created_at: string;
  id: string;
  authorID: string;
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
