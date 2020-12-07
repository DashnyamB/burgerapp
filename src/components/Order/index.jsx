import React from "react";
import css from "./style.module.css";

const Order = (props) => {
  return (
    <div className={css.Order}>
      <p>
        Орц : Гахайн мах : {props.order.orts.bacon} , Үхрийн мах :
        {props.order.orts.meat} , Бяслаг : {props.order.orts.cheese} , Салад :
        {props.order.orts.salad}
      </p>
      <p>
        Хаяг : {props.order.hayag.name} | {props.order.hayag.street} |
        {props.order.hayag.city}
      </p>
      <p>
        Үнэ : <strong> {props.order.dun}</strong>
      </p>
    </div>
  );
};

export default Order;
