// const formatDate = (date: Date = new Date()): string => {
//   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };

// export default formatDate;

const formatDate = (inputDate: Date = new Date()): string => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Ajoute un zéro devant le jour et le mois si nécessaire
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export default formatDate;

