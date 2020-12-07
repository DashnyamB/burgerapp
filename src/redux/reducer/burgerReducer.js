const initialState = {
  ingridients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 1000,
  purchasing: false,
  ingridientNames: {
    bacon: "Гахайн мах",
    meat: "Үхрийн мах",
    salad: "Салад",
    cheese: "Бяслаг",
  },
};
const INGRIDIENT_PRICES = {
  salad: 150,
  cheese: 250,
  bacon: 800,
  meat: 1500,
};

const burgerReducer = (state = initialState, action) => {
  if (action.type === "ADD_INGRIDIENT") {
    return {
      ...state,
      ingridients: {
        ...state.ingridients,
        [action.ortsNer]: state.ingridients[action.ortsNer] + 1,
      },
      totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ortsNer],
      purchasing: true,
    };
  } else if (action.type === "REMOVE_INGRIDIENT") {
    const newPrice = state.totalPrice - INGRIDIENT_PRICES[action.ortsNer];
    return {
      ...state,
      ingridients: {
        ...state.ingridients,
        [action.ortsNer]: state.ingridients[action.ortsNer] - 1,
      },
      totalPrice: newPrice,
      purchasing: newPrice > 1000,
    };
  }
  return state;
};

export default burgerReducer;
