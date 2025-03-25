export const changeCreatedDate = (createdDate) => {
  let year = createdDate.getFullYear();
  let month = createdDate.getMonth() + 1;
  let date = createdDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};