import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import burgerReducer from "./redux/reducer/burgerReducer";
import orderReducer from "./redux/reducer/orderReducer";
import signupLoginReducer from "./redux/reducer/signupLoginReducer";

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log("MyLoggerMiddleware : Dispatching : ", action);
      console.log("MyLoggerMiddleware : State Before ", store.getState());
      const result = next(action);
      console.log("MyLoggerMiddleware : State After ", store.getState());
      return result;
    };
  };
};

const reducers = combineReducers({
  burgerReducer,
  orderReducer,
  signupLoginReducer,
});

const middlewares = [loggerMiddleware, thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
