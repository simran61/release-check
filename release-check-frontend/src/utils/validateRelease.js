export const validateRelease = ({ name, date }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Release name is required.";
  if (!date.trim()) errors.date = "Date is required.";
  return errors;
};
