export function extractHourAndMinute(dateString: string) {
  try {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (minute < 10) {
      return `${hour}:0${minute}`;
    }
    return `${hour}:${minute}`;
  } catch (err) {
    console.error("error parsing date", err);
    return null;
  }
}

export function extractDayName(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDay();
  const dayName = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return `${dayName[day]}`;
}
