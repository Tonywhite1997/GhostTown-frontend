import {
  format,
  isToday,
  isThisMonth,
  isThisYear,
  isYesterday,
  parseISO,
} from "date-fns";
import { MessageType } from "../types/types";

export const groupMessagesByDate = (messages: MessageType[]) => {
  return messages.reduce<Record<string, MessageType[]>>((acc, msg) => {
    const date = parseISO(msg.created_at);
    const dateString = isToday(date)
      ? "Today"
      : isYesterday(date)
      ? "Yestarday"
      : isThisMonth(date)
      ? format(date, "MMMM d")
      : isThisYear(date)
      ? format(date, "MMMM")
      : format(date, "MMMM yyyy");

    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(msg);
    return acc;
  }, {});
};

export const lastMessageDate = (dateString: string): string => {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return format(date, "p");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (isThisMonth(date)) {
    return format(date, "MMMM d");
  } else if (isThisYear(date)) {
    return format(date, "MMMM d");
  } else {
    return format(date, "MMMM d, yyyy");
  }
};
