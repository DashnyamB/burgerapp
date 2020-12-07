import React from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import css from "./style.module.css";
import axios from "../../axios-orders";
import * as actions from "../../redux/action/orderActions";
import { withRouter } from "react-router-dom";

class ContactData extends React.Component {
  state = {
    name: null,
    city: null,
    street: null,
  };
  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeStreet = (e) => {
    this.setState({ street: e.target.value });
  };
  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };
  componentDidMount() {}

  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }
  saveOrder = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingridients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };
    this.props.saveOrderAction(newOrder);
  };
  render() {
    console.log(this.props);
    return (
      <div className={css.ContactData}>
        {this.props.price}
        <div>
          {this.props.newOrderStatus.error &&
            `Захиалгыг хадгалах явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>

        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder="Таны нэр"
            />
            <input
              onChange={this.changeStreet}
              type="text"
              name="street"
              placeholder="Таны гэрийн хаяг"
            />
            <input
              onChange={this.changeCity}
              type="text"
              name="city"
              placeholder="Таны хот"
            />
            <Button
              text="ИЛГЭЭХ"
              buttonType="Success"
              clicked={this.saveOrder}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingridients: state.burgerReducer.ingridients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
