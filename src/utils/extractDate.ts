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
