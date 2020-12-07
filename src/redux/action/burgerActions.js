export const addIngirient = (ortsNer) => {
  return {
    type: "ADD_INGRIDIENT",
    ortsNer,
  };
};
export const removeIngirient = (ortsNer) => {
  return {
    type: "REMOVE_INGRIDIENT",
    ortsNer,
  };
};
