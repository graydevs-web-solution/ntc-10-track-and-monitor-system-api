export const dateWithPadding = (data: string): string => {
  const [year, month, day] = data.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
