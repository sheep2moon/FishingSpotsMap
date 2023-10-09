export const timePassedFromNow = (targetDate: Date) => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - targetDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} sekund${seconds !== 1 ? "s" : ""} temu`;
  } else if (minutes < 60) {
    return `${minutes} minut${minutes == 1 ? "e" : ""} temu`;
  } else if (hours < 24) {
    return `${hours} godzin${hours == 1 ? "e" : "y"} temu`;
  } else {
    return `${days} ${days == 1 ? "dzień" : "dni"} temu`;
  }
};
