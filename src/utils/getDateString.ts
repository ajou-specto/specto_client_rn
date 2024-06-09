const getAddedZero = (num: number) => {
  const zeroStr = '0' + `${num}`;
  return zeroStr.substring(zeroStr.length - 2);
};

const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const d = date.getDate();
  return `${year}-${getAddedZero(month)}-${getAddedZero(d)}`;
};

export default getDateString;
