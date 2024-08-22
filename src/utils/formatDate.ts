import {
  format,
  isToday,
  isThisMonth,
  isThisYear,
  isYesterday,
  parseISO,
} from "date-fns";
import { MessageType } from "../types/types";

// Function to parse date strings for sorting
const parseDateString = (dateString: string): Date => {
  if (dateString === "Today") {
    return new Date(); // Current date
  } else if (dateString === "Yesterday") {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  } else {
    // Convert "Month Day" format to Date object
    const [month, day] = dateString.split(" ");
    const now = new Date();
    const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth();
    return new Date(now.getFullYear(), monthIndex, parseInt(day));
  }
};

export const groupMessagesByDate = (messages: MessageType[]) => {
  const grouped = messages.reduce<Record<string, MessageType[]>>((acc, msg) => {
    const date = parseISO(msg.created_at);
    const dateString = isToday(date)
      ? "Today"
      : isYesterday(date)
      ? "Yesterday"
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

  // Convert the object to array of messages
  const entries = Object.entries(grouped);

  // Sort entries by date
  const sortedEntries = entries.sort(([dateA], [dateB]) => {
    return parseDateString(dateA).getTime() - parseDateString(dateB).getTime();
  });

  return sortedEntries.map(([date, msgs]) => ({ date, msgs }));
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
