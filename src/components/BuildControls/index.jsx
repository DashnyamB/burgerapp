import React from "react";
import { connect } from "react-redux";
import Style from "./style.module.css";
import BuildControl from "../BuildControl";
import * as actions from "../../redux/action/burgerActions";

const BuildControls = (props) => {
  const disabledIngridients = { ...props.ingridients };

  for (let key in disabledIngridients) {
    disabledIngridients[key] = disabledIngridients[key] <= 0;
  }
  return (
    <div className={Style.BuildControls}>
      <p>
        Бургерын үнэ : <strong>{props.price}</strong>
      </p>
      {Object.keys(props.ingridientNames).map((el) => (
        <BuildControl
          key={el}
          disabled={disabledIngridients}
          type={el}
          orts={props.ingridientNames[el]}
          ortsNemeh={props.ortsNemeh}
          ortsHasah={props.ortsHasah}
        />
      ))}

      <button
        onClick={props.showConfirmModal}
        disabled={!props.purchasing}
        className={Style.OrderButton}
      >
        Захиалах
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingridients: state.burgerReducer.ingridients,
    price: state.burgerReducer.totalPrice,
    purchasing: state.burgerReducer.purchasing,
    ingridientNames: state.burgerReducer.ingridientNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ortsNemeh: (ortsNer) => {
      dispatch(actions.addIngirient(ortsNer));
    },
    ortsHasah: (ortsNer) => {
      dispatch(actions.removeIngirient(ortsNer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
