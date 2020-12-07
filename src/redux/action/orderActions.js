import axios from "../../axios-orders";

export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    // Захиалгыг татаж эхэллээ гэдгийг мэдэгдэнэ
    // Энийг хүлээж аваад Спиннер Ажиллаж эхэлнэ
    dispatch(loadOrdersStart());

    const token = getState().signupLoginReducer.token;

    axios
      .get(`/orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const loadedOrders = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(loadedOrders));
      })
      .catch((error) => dispatch(loadOrdersError(error)));
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

// Захиалгийг хадгалах хэсэг

export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    // Spinner эргэлдүүлнэ
    dispatch(saveOrderStart());
    const token = getState().signupLoginReducer.token;
    // FireBase лүү хадгална
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((response) => dispatch(saveOrderSuccess()))
      .catch((error) => dispatch(saveOrderError(error)));
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};
export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};
