export const getToday = () => {
  const today = new Date().toLocaleDateString("en-gb");
  return today;
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const getFormattedDate = (date) => new Date(date).toLocaleDateString();

export const getFormattedDateForDateEl = (date) =>
  new Date(date).toISOString().split("T")[0];

export const getTimeStamp = (date) => Date.now(date);
