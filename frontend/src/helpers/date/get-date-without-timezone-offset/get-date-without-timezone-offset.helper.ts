const SECONDS = 60;
const MILLISECONDS = 1000;

const getDateWithoutTimezoneOffset = (date: string): string => {
  const dateWithoutTimezoneOffset =  new Date(date).getTime() - new Date().getTimezoneOffset() * SECONDS * MILLISECONDS;

  return new Date(dateWithoutTimezoneOffset).toISOString();
};

export { getDateWithoutTimezoneOffset };
