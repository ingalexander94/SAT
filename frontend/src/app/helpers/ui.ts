const normalizeText = (text: String) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const resetDate = (date: string) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString();
};

export { normalizeText, resetDate };
