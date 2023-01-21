export const subtractMonths = (date: Date, months: number) => {
  date.setMonth(date.getMonth() - months);

  //setting to the first day of a month
  date = new Date(date.getFullYear(), date.getMonth(), 2);

  return date;
};

export const getMonthsNameAndYearFromDate = (date: Date, months: number) => {
  date.setMonth(date.getMonth() - months);
  return `${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getFullYear()}`;
};

export const getPreviousDay = () => {
  const date = new Date();
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
};

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getStartTime = (month: number, year: number) => {
  let date = new Date();
  date.setUTCMonth(month);
  date.setUTCFullYear(year);
  date.setUTCDate(1);
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(1);
  return date;
};
export const getEndTime = (month: number, year: number) => {
  let date = new Date();
  date.setUTCMonth(month);
  date.setUTCFullYear(year);
  date.setUTCDate(daysInMonth(month, year));
  date.setUTCHours(23);
  date.setUTCMinutes(59);
  date.setUTCSeconds(59);
  return date;
};
