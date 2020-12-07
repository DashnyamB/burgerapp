import React from "react";
import { connect } from "react-redux";
import Button from "../General/Button";

const OrderSummary = (props) => {
  return (
    <div>
      <h3>Таний Захиалга</h3>
      <p>Таний сонгосон орцууд : </p>
      <ul>
        {Object.keys(props.ingridients).map((el) => (
          <li key={el}>
            {`${props.ingridientNames[el]} : ${props.ingridients[el]}`}
          </li>
        ))}
      </ul>
      <p>
        Захиалгын дүн : <strong>{props.price}</strong> төгрөг
      </p>
      <p>Цаашаа үргэлжлүүлэх үү ?</p>
      <Button clicked={props.onCancel} buttonType="Danger" text="ТАТГАЛЗАХ" />
      <Button
        clicked={props.onContinue}
        buttonType="Success"
        text="ҮРГЭЛЖЛҮҮЛЭХ"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingridientNames: state.burgerReducer.ingridientNames,
    ingridients: state.burgerReducer.ingridients,
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(OrderSummary);
