export const getStatus = (stepsCompleted) => {
  const completedCount = stepsCompleted.filter(Boolean).length;
  if (completedCount === 0) return "Planned";
  if (completedCount === stepsCompleted.length) return "Done";
  return "Ongoing";
};
