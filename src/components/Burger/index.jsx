import React from "react";
import { connect } from "react-redux";
import BurgerIngredient from "../BurgerIngredient";
import Style from "./style.module.css";
import { withRouter } from "react-router-dom";

const Burger = (props) => {
  let items = Object.entries(props.orts);

  let content = [];

  items.map((el) => {
    for (let i = 0; i < el[1]; i++)
      content.push(<BurgerIngredient key={`${el[0]}${i + 1}`} type={el[0]} />);
  });

  if (content.length === 0)
    content = <p>Хачиртай талхныхаа орцыг сонгоно уу... </p>;
  return (
    <div className={Style.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orts: state.burgerReducer.ingridients,
  };
};

export default connect(mapStateToProps)(withRouter(Burger));
